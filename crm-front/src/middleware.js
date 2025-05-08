import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  console.log(`Middleware processing: ${req.url}`);
  
  try {
    // Check for NextAuth.js session cookies (both secure and non-secure variants)
    const cookies = req.cookies;
    const hasSessionToken = cookies.has('next-auth.session-token') || 
                           cookies.has('__Secure-next-auth.session-token');
    
    // Get the JWT token using NextAuth's getToken
    const token = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    
    console.log(`Session cookie present: ${hasSessionToken}`);
    console.log(`Token extracted: ${!!token}`);
    console.log(`Token user present: ${!!(token?.user)}`);
    
    const baseUrl = req.nextUrl.origin;
    const pathname = req.nextUrl.pathname;
    
    // CRITICAL: Update to match your actual frontend URL path (/signin)
    // But also include the path from NextAuth config (/login) to handle both
    const unprotectedPaths = ["/signin", "/login", "/signup", "/forgot-password", "/reset-password"];
    const isAuthPage = unprotectedPaths.some(path => 
      pathname === path || pathname === `${path}/`
    );
    
    console.log(`Current path: ${pathname}, Is auth page: ${isAuthPage}`);

    // Handle Azure AD callback URLs
    if (pathname.startsWith('/api/auth/callback') || pathname.startsWith('/api/auth/signin')) {
      console.log("Auth callback detected, allowing without redirect");
      return NextResponse.next();
    }
    
    // If session cookie exists but token is not fully formed yet, allow access temporarily
    // This handles the token timing issue during the auth flow
    if (hasSessionToken && !token?.user && !isAuthPage) {
      console.log("Session cookie exists but token not fully formed yet, allowing temporarily");
      return NextResponse.next();
    }

    // If authenticated and trying to access auth pages, redirect to home
    if (token?.user && isAuthPage) {
      console.log("Authenticated user on auth page, redirecting to home");
      return NextResponse.redirect(new URL("/", baseUrl));
    }

    // If not authenticated and trying to access protected pages, redirect to signin (UPDATED)
    if (!token?.user && !isAuthPage) {
      console.log("Unauthenticated user on protected page, redirecting to signin");
      // Use the actual frontend path you're using
      return NextResponse.redirect(new URL("/signin", baseUrl));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // On error, proceed to the page which will handle auth state appropriately
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