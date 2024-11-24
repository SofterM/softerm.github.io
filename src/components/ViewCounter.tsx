// src/components/ViewCounter.tsx

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { ViewRecord, PostgresChanges } from '@/types/supabase';

interface ViewCounterProps {
  isDark: boolean;
}

const VIEW_COUNT_KEY = 'view-count-key';
const VIEW_COUNTED_KEY = 'view-counted';
const MINIMUM_VIEW_TIME = 5000;
const ANIMATION_DURATION = 2000;
const SCROLL_THRESHOLD = 100; // Show counter when scrolled less than this

const ViewCounter: React.FC<ViewCounterProps> = ({ isDark }) => {
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [opacity, setOpacity] = useState(1);
  const previousCount = useRef<number | null>(null);

  // Update opacity based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newOpacity = Math.max(0, 1 - (scrollPosition / SCROLL_THRESHOLD));
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rest of your existing logic...
  const animateCount = useCallback((start: number, end: number, duration: number) => {
    const startTime = Date.now();
    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(start + (end - start) * easeOutQuart);
      setDisplayCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };
    requestAnimationFrame(updateCount);
  }, []);

  const fetchViewCount = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('page_views')
        .select('count')
        .eq('page_id', VIEW_COUNT_KEY)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          const { data: newData, error: insertError } = await supabase
            .from('page_views')
            .insert([{ 
              page_id: VIEW_COUNT_KEY, 
              count: 0
            }])
            .select()
            .single();

          if (!insertError && newData) {
            setViewCount(0);
            if (previousCount.current === null) {
              animateCount(0, 0, ANIMATION_DURATION);
            }
            previousCount.current = 0;
            return;
          }
        }
        throw error;
      }

      const newCount = data?.count || 0;
      setViewCount(newCount);
      
      if (previousCount.current === null) {
        animateCount(0, newCount, ANIMATION_DURATION);
      } else {
        animateCount(previousCount.current, newCount, ANIMATION_DURATION);
      }
      previousCount.current = newCount;
    } catch (error) {
      console.error('Error fetching view count:', error);
    }
  }, [animateCount]);

  const incrementViewCount = useCallback(async () => {
    try {
      const hasCounted = sessionStorage.getItem(VIEW_COUNTED_KEY);
      if (hasCounted === 'true') return;

      const { data: currentData, error: fetchError } = await supabase
        .from('page_views')
        .select('count')
        .eq('page_id', VIEW_COUNT_KEY)
        .single();

      if (fetchError) throw fetchError;

      const newCount = (currentData?.count || 0) + 1;

      const { error: updateError } = await supabase
        .from('page_views')
        .update({ count: newCount })
        .eq('page_id', VIEW_COUNT_KEY);

      if (updateError) throw updateError;

      setViewCount(newCount);
      sessionStorage.setItem(VIEW_COUNTED_KEY, 'true');
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  }, []);

  useEffect(() => {
    const hasCounted = sessionStorage.getItem(VIEW_COUNTED_KEY);
    if (!hasCounted) {
      setStartTime(Date.now());
    }
  }, []);

  useEffect(() => {
    if (startTime) {
      const timer = setInterval(() => {
        const timeSpent = Date.now() - startTime;
        if (timeSpent >= MINIMUM_VIEW_TIME) {
          incrementViewCount();
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startTime, incrementViewCount]);

  useEffect(() => {
    fetchViewCount();

    const channel = supabase
      .channel('page_views_changes')
      .on<PostgresChanges>(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'page_views',
          filter: `page_id=eq.${VIEW_COUNT_KEY}`
        },
        (payload) => {
          const newData = payload.new as ViewRecord;
          if (newData && typeof newData.count === 'number') {
            setViewCount(newData.count);
            if (previousCount.current !== null) {
              animateCount(previousCount.current, newData.count, ANIMATION_DURATION);
            }
            previousCount.current = newData.count;
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [fetchViewCount, animateCount]);

  if (opacity === 0) return null;

  return (
    <div
      className={`fixed top-4 left-4 z-50
        p-2 sm:p-3 rounded-full 
        transition-all duration-300
        backdrop-blur-xl shadow-lg
        ${isDark 
          ? 'bg-purple-900/30 hover:bg-purple-800/40 border border-purple-700/30' 
          : 'bg-white/80 hover:bg-purple-50/80 border border-purple-200/50'} 
        flex items-center gap-2 group`}
      style={{
        opacity,
        transform: `translateY(${(1 - opacity) * -20}px)`, // Slide up slightly as it fades
        pointerEvents: opacity > 0.1 ? 'auto' : 'none' // Disable interaction when nearly invisible
      }}
    >
      <Eye 
        className={`${isDark ? 'text-purple-400' : 'text-purple-600'} 
          w-4 h-4 sm:w-5 sm:h-5
          transition-transform duration-300 group-hover:scale-110`} 
      />
      <div className="flex flex-col">
        <span 
          className={`${isDark ? 'text-purple-300' : 'text-purple-600'} 
            text-xs sm:text-sm font-medium
            transition-all duration-300`}
        >
          {viewCount === null ? 'Loading...' : `${displayCount.toLocaleString()} views`}
        </span>
      </div>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 -z-10 rounded-full blur-md opacity-50
        transition-opacity duration-300 group-hover:opacity-75
        ${isDark ? 'bg-purple-800/30' : 'bg-purple-200/50'}`} />
    </div>
  );
};

export default ViewCounter;