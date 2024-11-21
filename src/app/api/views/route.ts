import { NextResponse } from 'next/server';
import { redis } from '@/lib/upstash';

export async function GET() {
  try {
    // ใช้ INCR command เพื่อเพิ่มค่า view count
    const views = await redis.incr('page_views');
    
    // บันทึกเวลาที่มีการ view ล่าสุด
    await redis.set('last_viewed', Date.now());
    
    return NextResponse.json({ views });
  } catch (error) {
    console.error('Failed to update view count:', error);
    return NextResponse.json(
      { error: 'Failed to update view count' }, 
      { status: 500 }
    );
  }
}