// src/components/ViewCounter.tsx
import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ViewCounterProps {
  isDark: boolean;
}

const STORAGE_KEY = 'viewTimestamp';
const MINIMUM_VIEW_TIME = 5000; // 5 seconds in milliseconds

const ViewCounter: React.FC<ViewCounterProps> = ({ isDark }) => {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchViews = async () => {
      try {
        const { data, error } = await supabase
          .from('page_views')
          .select('count')
          .eq('page_id', 'main')
          .single();

        if (error) throw error;
        if (isMounted) {
          setViewCount(data?.count || 0);
        }
      } catch (error) {
        console.error('Error fetching views:', error);
      }
    };

    const shouldCountView = () => {
      const lastViewTime = localStorage.getItem(STORAGE_KEY);
      const currentTime = Date.now();

      if (!lastViewTime) return true;

      const timeDifference = currentTime - parseInt(lastViewTime);
      return timeDifference >= MINIMUM_VIEW_TIME;
    };

    const incrementViews = async () => {
      try {
        // ดึงค่าปัจจุบันก่อน
        const { data: currentData, error: fetchError } = await supabase
          .from('page_views')
          .select('count')
          .eq('page_id', 'main')
          .single();

        if (fetchError) throw fetchError;

        // อัพเดทค่าใหม่
        const newCount = (currentData?.count || 0) + 1;
        const { error: updateError } = await supabase
          .from('page_views')
          .update({ count: newCount })
          .eq('page_id', 'main');

        if (updateError) throw updateError;

        if (isMounted) {
          setViewCount(newCount);
        }
        
        // บันทึกเวลาที่นับ view
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
      } catch (error) {
        console.error('Error incrementing views:', error);
      }
    };

    // ฟังก์ชันสำหรับเริ่มนับเวลาดูเพจ
    const startViewTimer = () => {
      if (shouldCountView()) {
        const timer = setTimeout(() => {
          incrementViews();
        }, MINIMUM_VIEW_TIME);
        return timer;
      }
      return null;
    };

    // เริ่มต้นโดยดึงข้อมูลปัจจุบัน
    fetchViews();

    // เริ่มนับเวลาดูเพจ
    const timer = startViewTimer();

    // Cleanup
    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
    };
  }, []);

  // ฟังก์ชันสำหรับ format จำนวน views
  const formatViewCount = (count: number | null): string => {
    if (count === null) return 'Loading...';
    return `${count.toLocaleString()} ${count === 1 ? 'view' : 'views'}`;
  };

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
        {formatViewCount(viewCount)}
      </span>
    </div>
  );
};

export default ViewCounter;