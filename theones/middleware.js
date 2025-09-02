import { NextResponse } from 'next/server';
import crawlerAnalytics from './lib/crawler-analytics';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'Unknown';
  const timestamp = new Date().toISOString();

  // Track visits to all pages (exclude static assets)
  if (!pathname.startsWith('/_next') && 
      !pathname.startsWith('/api') && 
      !pathname.includes('.') &&
      !pathname.startsWith('/robots.txt') &&
      !pathname.startsWith('/llm.txt')) {
    
    // Log the page visit
    crawlerAnalytics.logVisit(pathname, userAgent, clientIP, timestamp);
    
    console.log(`[${timestamp}] Page visit: ${pathname} - User-Agent: ${userAgent}, IP: ${clientIP}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
