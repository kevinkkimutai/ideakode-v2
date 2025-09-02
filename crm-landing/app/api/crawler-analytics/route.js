import { NextResponse } from 'next/server';

// In-memory storage for development (in production, use a database)
let crawlerLogs = [];

export async function POST(request) {
  try {
    const data = await request.json();
    
    const logEntry = {
      ...data,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    
    // Store in memory (replace with database in production)
    crawlerLogs.push(logEntry);
    
    // Keep only last 1000 entries to prevent memory issues
    if (crawlerLogs.length > 1000) {
      crawlerLogs = crawlerLogs.slice(-1000);
    }
    
    console.log(`📊 Crawler activity logged: ${data.crawler} → ${data.path}`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging crawler activity:', error);
    return NextResponse.json({ error: 'Failed to log activity' }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '50');
  const crawler = searchParams.get('crawler');
  
  let filteredLogs = crawlerLogs;
  
  // Filter by crawler if specified
  if (crawler) {
    filteredLogs = crawlerLogs.filter(log => 
      log.crawler.toLowerCase().includes(crawler.toLowerCase())
    );
  }
  
  // Return latest entries (limited)
  const recentLogs = filteredLogs
    .slice(-limit)
    .reverse(); // Most recent first
  
  return NextResponse.json({
    logs: recentLogs,
    total: filteredLogs.length,
    crawlerStats: getCrawlerStats(crawlerLogs)
  });
}

function getCrawlerStats(logs) {
  const stats = {};
  const pathStats = {};
  
  logs.forEach(log => {
    // Crawler count
    if (!stats[log.crawler]) {
      stats[log.crawler] = 0;
    }
    stats[log.crawler]++;
    
    // Path popularity
    if (!pathStats[log.path]) {
      pathStats[log.path] = 0;
    }
    pathStats[log.path]++;
  });
  
  return {
    crawlerCounts: stats,
    popularPaths: Object.entries(pathStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .reduce((obj, [path, count]) => {
        obj[path] = count;
        return obj;
      }, {}),
    totalVisits: logs.length,
    lastActivity: logs.length > 0 ? logs[logs.length - 1].timestamp : null
  };
}
