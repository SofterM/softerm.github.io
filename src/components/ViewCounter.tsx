// src/components/ViewCounter.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Eye, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { PageView, PostgresChanges } from '@/types/supabase';

interface ViewCounterProps {
  isDark: boolean;
}

const VIEW_COUNT_KEY = 'view-count-key';
const VIEW_COUNTED_KEY = 'view-counted'; // ใช้ sessionStorage แทน localStorage
const MINIMUM_VIEW_TIME = 5000; // 5 seconds

const ViewCounter: React.FC<ViewCounterProps> = ({ isDark }) => {
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [hasStartedCounting, setHasStartedCounting] = useState(false);

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
      // ตรวจสอบว่าได้นับไปแล้วหรือยังในแท็บนี้
      const hasCounted = sessionStorage.getItem(VIEW_COUNTED_KEY);
      if (hasCounted === 'true') {
        return;
      }

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
      // บันทึกว่าได้นับแล้วในแท็บนี้
      sessionStorage.setItem(VIEW_COUNTED_KEY, 'true');
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  }, []);

  // เริ่มนับเวลาเมื่อโหลดหน้า
  useEffect(() => {
    const hasCounted = sessionStorage.getItem(VIEW_COUNTED_KEY);
    if (!hasCounted && !hasStartedCounting) {
      setHasStartedCounting(true);
      
      // เริ่มนับเวลา 5 วินาที
      const timer = setTimeout(() => {
        incrementViewCount();
      }, MINIMUM_VIEW_TIME);

      // ตรวจสอบการออกจากแท็บ
      const handleVisibilityChange = () => {
        if (document.hidden) {
          clearTimeout(timer);
          setHasStartedCounting(false);
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [incrementViewCount, hasStartedCounting]);

  // ดึงข้อมูล view count และติดตามการเปลี่ยนแปลง
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
          if (
            payload.new &&
            'count' in payload.new &&
            typeof payload.new.count === 'number'
          ) {
            setViewCount(payload.new.count);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [fetchViewCount]);

  if (!isVisible) return null;

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
      <button
        onClick={() => setIsVisible(false)}
        className={`ml-2 p-1 rounded-full 
          transition-colors duration-200
          hover:bg-gray-700/20
          ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`}
        aria-label="Close view counter"
      >
        <X className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
};

export default ViewCounter;