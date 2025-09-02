import { NextResponse } from 'next/server';
import crawlerAnalytics from '../../../../lib/crawler-analytics';

export async function GET(request) {
  try {
    // Load data from file if available
    await crawlerAnalytics.loadDataFromFile();
    
    const url = new URL(request.url);
    const limitParam = url.searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 50;
    
    const visits = crawlerAnalytics.getRecentVisits(limit);
    
    return NextResponse.json(visits, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error fetching recent visits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent visits' },
      { status: 500 }
    );
  }
}
