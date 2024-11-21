// src/components/ViewCounter.tsx
import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ViewCounterProps {
  isDark: boolean;
}

const ViewCounter: React.FC<ViewCounterProps> = ({ isDark }) => {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        // ดึงข้อมูล views ปัจจุบัน
        const { data, error } = await supabase
          .from('page_views')
          .select('count')
          .single();
        
        if (error) {
          if (error.code === 'PGRST116') {
            // ถ้าไม่มีข้อมูล ให้สร้างใหม่
            const { data: newData, error: insertError } = await supabase
              .from('page_views')
              .insert([{ count: 1 }])
              .select()
              .single();

            if (!insertError && newData) {
              setViewCount(1);
            }
          }
          return;
        }

        setViewCount(data?.count || 0);
      } catch (error) {
        console.error('Failed to fetch views:', error);
      }
    };

    const incrementViews = async () => {
      try {
        const { data, error } = await supabase
          .from('page_views')
          .select('*')
          .single();

        if (error) return;

        const newCount = (data.count || 0) + 1;
        const { error: updateError } = await supabase
          .from('page_views')
          .update({ count: newCount })
          .eq('id', data.id);

        if (!updateError) {
          setViewCount(newCount);
        }
      } catch (error) {
        console.error('Failed to increment views:', error);
      }
    };

    // โหลดค่า views เมื่อเริ่มต้น
    fetchViews();

    // เช็คว่าเคยนับ view ในเซสชันนี้หรือยัง
    const hasViewedThisSession = sessionStorage.getItem('hasViewed') === 'true';
    
    if (!hasViewedThisSession) {
      // รอ 5 วินาทีแล้วนับ view
      const timer = setTimeout(() => {
        incrementViews();
        sessionStorage.setItem('hasViewed', 'true');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

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
        {viewCount.toLocaleString()} views
      </span>
    </div>
  );
};

export default ViewCounter;