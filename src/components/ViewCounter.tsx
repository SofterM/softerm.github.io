import React, { useState, useEffect, useCallback } from 'react';
import { Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { PageView, PostgresChanges } from '@/types/supabase';

interface ViewCounterProps {
  isDark: boolean;
}

const VIEW_COUNT_KEY = 'view-count-key';
const LAST_VIEW_TIME = 'last-view-time';
const MINIMUM_VIEW_INTERVAL = 5000;

const ViewCounter: React.FC<ViewCounterProps> = ({ isDark }) => {
  const [viewCount, setViewCount] = useState<number | null>(null);

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
            .insert([{ page_id: VIEW_COUNT_KEY, count: 0 }])
            .select()
            .single();

          if (!insertError && newData) {
            setViewCount(0);
            return;
          }
        }
        throw error;
      }

      setViewCount(data?.count || 0);
    } catch (error) {
      console.error('Error fetching view count:', error);
    }
  }, []);

  const incrementViewCount = useCallback(async () => {
    try {
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
      localStorage.setItem(LAST_VIEW_TIME, Date.now().toString());
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  }, []);

  const shouldCountView = useCallback(() => {
    const lastViewTime = localStorage.getItem(LAST_VIEW_TIME);
    if (!lastViewTime) return true;

    const timeDiff = Date.now() - parseInt(lastViewTime);
    return timeDiff >= MINIMUM_VIEW_INTERVAL;
  }, []);

  useEffect(() => {
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
          const newData = payload.new as PageView;
          if (newData && typeof newData.count === 'number') {
            setViewCount(newData.count);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    const initializeCounter = async () => {
      await fetchViewCount();
      
      if (shouldCountView()) {
        timeoutId = setTimeout(async () => {
          await incrementViewCount();
        }, MINIMUM_VIEW_INTERVAL);
      }
    };

    initializeCounter();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [fetchViewCount, incrementViewCount, shouldCountView]);

  return (
    <div
      className={`fixed top-4 left-4 z-50 
        p-2 sm:p-3 rounded-full 
        transition-all duration-300
        backdrop-blur-xl shadow-lg
        ${isDark 
          ? 'bg-gray-800/50 border border-gray-700/30' 
          : 'bg-white/80 border border-gray-200/50'} 
        flex items-center gap-2`}
    >
      <Eye 
        className={`${isDark ? 'text-blue-400' : 'text-blue-600'} w-4 h-4 sm:w-5 sm:h-5`} 
      />
      <span 
        className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-xs sm:text-sm font-medium`}
      >
        {viewCount === null ? 'Loading...' : `${viewCount.toLocaleString()} views`}
      </span>
    </div>
  );
};

export default ViewCounter;