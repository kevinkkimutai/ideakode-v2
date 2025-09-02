import { NextResponse } from 'next/server';
import crawlerAnalytics from '../../../lib/crawler-analytics';

export async function POST(request) {
  try {
    const { pathname, userAgent, referrer } = await request.json();
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'Unknown';
    const timestamp = new Date().toISOString();

    // Log the page visit
    const visit = crawlerAnalytics.logVisit(
      pathname || 'Unknown Page', 
      userAgent || 'Unknown', 
      clientIP, 
      timestamp
    );

    console.log(`[${timestamp}] Client-side page visit: ${pathname} - User-Agent: ${userAgent}`);

    return NextResponse.json({ 
      success: true, 
      visitId: visit.id 
    });
  } catch (error) {
    console.error('Error logging page visit:', error);
    return NextResponse.json(
      { error: 'Failed to log visit' }, 
      { status: 500 }
    );
  }
}
