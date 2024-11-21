import { NextResponse } from 'next/server';
import { redis } from '@/lib/upstash';

export async function GET() {
  try {
    // ดึงค่า view count ปัจจุบัน
    const views = await redis.get('page_views');
    
    if (views === null) {
      // ถ้ายังไม่มีค่า view count ให้เริ่มที่ 0
      await redis.set('page_views', 0);
      return NextResponse.json({ views: 0 });
    }
    
    return NextResponse.json({ views });
  } catch (error) {
    console.error('Failed to get view count:', error);
    return NextResponse.json(
      { error: 'Failed to get view count' }, 
      { status: 500 }
    );
  }
}