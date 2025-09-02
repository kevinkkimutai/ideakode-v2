import { NextResponse } from 'next/server';
import crawlerAnalytics from '../../../lib/crawler-analytics';

export async function GET() {
  try {
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

// Optional: Add DELETE endpoint to clear data (for admin use)
export async function DELETE() {
  try {
    crawlerAnalytics.clearData();
    
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
