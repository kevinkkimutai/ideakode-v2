import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  // Add logging for debugging in production
  console.log(`Middleware processing: ${req.url}`);
  
  try {
    // Check if there's a cookie indicating a recent login
    const cookies = req.cookies;
    const recentLogin = cookies.get('next-auth.session-token') || cookies.get('__Secure-next-auth.session-token');
    
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });

    // More reliable token extraction
    const token = session?.token || session?.user?.token || null;
    
    // Debug log the token status (don't log the actual token)
    console.log(`Token present: ${!!token}`);
    console.log(`Recent login cookie present: ${!!recentLogin}`);
    
    // Get base URL for redirects - crucial for production environments
    const baseUrl = req.nextUrl.origin;
    console.log(`Base URL: ${baseUrl}`);
    
    // Parse URL more carefully
    const pathname = req.nextUrl.pathname;
    console.log(`Request path: ${pathname}`);

    // Define unprotected routes - be more flexible with trailing slashes
    const unprotectedPaths = ["/signin", "/forgot-password", "/reset-password"];
    
    // More robust path checking that handles trailing slashes
    const isUnprotected = unprotectedPaths.some(path => 
      pathname === path || pathname === `${path}/`
    );
    
    console.log(`Is unprotected route: ${isUnprotected}`);

    // If we have a recent login cookie but no token yet, allow access for a short period
    // This gives time for the token to be properly established
    if (recentLogin && !token && !isUnprotected) {
      console.log("Recent login detected but token not yet available, allowing access temporarily");
      return NextResponse.next();
    }

    if (token && isUnprotected) {
      console.log("Authenticated user accessing unprotected route, redirecting to home");
      // Use absolute URL with origin for more reliable redirects in production
      const redirectUrl = new URL("/", baseUrl).toString();
      console.log(`Redirecting to: ${redirectUrl}`);
      return NextResponse.redirect(redirectUrl);
    }

    if (!token && !isUnprotected) {
      console.log("Unauthenticated user accessing protected route, redirecting to signin");
      // Use absolute URL with origin for more reliable redirects in production
      const redirectUrl = new URL("/signin", baseUrl).toString();
      console.log(`Redirecting to: ${redirectUrl}`);
      return NextResponse.redirect(redirectUrl);
    }

    console.log("Middleware allowing request to proceed");
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // Fail gracefully - on error, allow the request but let the page/API handle auth
    return NextResponse.next();
  }
}

// More specific matcher that excludes public assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};