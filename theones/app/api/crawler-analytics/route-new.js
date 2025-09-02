import { NextResponse } from 'next/server';
import crawlerAnalytics from '../../../lib/crawler-analytics';

export async function GET(request) {
  try {
    // Load data from file if available
    await crawlerAnalytics.loadDataFromFile();
    
    const analytics = crawlerAnalytics.getAnalytics();
    
    return NextResponse.json(analytics, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await crawlerAnalytics.clearData();
    
    return NextResponse.json(
      { message: 'Analytics data cleared successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error clearing analytics:', error);
    return NextResponse.json(
      { error: 'Failed to clear analytics' },
      { status: 500 }
    );
  }
}
