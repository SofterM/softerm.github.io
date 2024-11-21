// src/components/ViewCounter.tsx
import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

interface ViewCounterProps {
  isDark: boolean;
}

const ViewCounter: React.FC<ViewCounterProps> = ({ isDark }) => {
  const [viewCount, setViewCount] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    // โหลดค่า view count เมื่อเริ่มต้น
    const savedCount = parseInt(localStorage.getItem('viewCount') || '0');
    setViewCount(savedCount);

    // เช็คว่าเคยนับ view ในเซสชันนี้หรือยัง
    const hasViewedThisSession = sessionStorage.getItem('hasViewed') === 'true';
    
    if (!hasViewedThisSession) {
      // ถ้ายังไม่เคยนับในเซสชันนี้ ให้เริ่มนับเวลา
      const timer = setInterval(() => {
        setTimeSpent(prev => {
          const newTime = prev + 1;
          // ถ้าครบ 5 วินาทีและยังไม่เคยนับในเซสชันนี้
          if (newTime >= 5) {
            clearInterval(timer);
            const newCount = savedCount + 1;
            localStorage.setItem('viewCount', newCount.toString());
            sessionStorage.setItem('hasViewed', 'true');
            setViewCount(newCount);
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
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