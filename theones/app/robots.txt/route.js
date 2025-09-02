import { NextResponse } from 'next/server';
import crawlerAnalytics from '../../lib/crawler-analytics';

export async function GET(request) {
  // Log the request for monitoring
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const timestamp = new Date().toISOString();
  const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'Unknown';
  
  // Store in analytics system
  crawlerAnalytics.logVisit('robots.txt', userAgent, clientIP, timestamp);
  
  console.log(`[${timestamp}] robots.txt accessed - User-Agent: ${userAgent}, IP: ${clientIP}`);

  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://www.netiqa.co.ke/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Block admin and sensitive areas (adjust as needed)
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /zohoverify/

# Allow AI bots for GEO
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}
