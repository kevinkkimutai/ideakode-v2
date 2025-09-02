import { NextResponse } from "next/server";

export function middleware(request) {
  const userAgent = request.headers.get("user-agent") || "Unknown";
  const timestamp = new Date().toISOString();
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams.toString();
  const fullUrl = pathname + (searchParams ? `?${searchParams}` : '');

  // Known AI/LLM crawlers and their variations
  const aiCrawlers = [
    "GPTBot",
    "ChatGPT-User", 
    "PerplexityBot",
    "ClaudeBot",
    "Claude-Web",
    "CCBot", // Common Crawl (used by many AI models)
    "anthropic",
    "OpenAI",
    "Google-Extended", // Bard/Gemini
    "Bard",
    "BingBot", // Copilot
    "facebookexternalhit", // Meta AI
    "Applebot", // Apple Intelligence
    "YouBot", // You.com AI search
    "DuckDuckBot" // DuckDuckGo AI features
  ];

  // Check if the user agent contains any known AI crawler identifiers
  const detectedCrawler = aiCrawlers.find(crawler => 
    userAgent.toLowerCase().includes(crawler.toLowerCase())
  );

  if (detectedCrawler) {
    // Log crawler activity
    console.log(
      `🤖 [AI Crawler Detected] ${detectedCrawler} → ${fullUrl}`
    );
    
    // More detailed logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`   User Agent: ${userAgent}`);
      console.log(`   Timestamp: ${timestamp}`);
      console.log(`   IP: ${request.ip || 'Unknown'}`);
      console.log('   ---');
    }

    // Log to analytics API (fire and forget)
    try {
      fetch(new URL('/api/crawler-analytics', request.url), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crawler: detectedCrawler,
          userAgent: userAgent,
          path: fullUrl,
          ip: request.ip || 'Unknown',
          referer: request.headers.get('referer') || null,
          timestamp: timestamp
        }),
      }).catch(() => {}); // Silently ignore fetch errors
    } catch (error) {
      // Ignore analytics errors
    }

    // Optional: Add custom headers for analytics
    const response = NextResponse.next();
    response.headers.set('X-Crawler-Detected', detectedCrawler);
    response.headers.set('X-Crawler-Timestamp', timestamp);
    
    return response;
  }

  // Log other search engine crawlers for reference
  const searchCrawlers = [
    "Googlebot",
    "Bingbot", 
    "YandexBot",
    "DuckDuckBot",
    "Slurp", // Yahoo
    "facebookexternalhit",
    "Twitterbot",
    "LinkedInBot"
  ];

  const detectedSearchCrawler = searchCrawlers.find(crawler => 
    userAgent.toLowerCase().includes(crawler.toLowerCase())
  );

  if (detectedSearchCrawler && process.env.NODE_ENV === 'development') {
    console.log(`🔍 [Search Crawler] ${detectedSearchCrawler} → ${fullUrl}`);
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
