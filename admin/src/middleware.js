import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  // Add logging for debugging in production
  console.log(`Middleware processing: ${req.url}`);
  
  try {
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });

    // More reliable token extraction
    const token = session?.token || session?.user?.token || null;
    
    // Debug log the token status (don't log the actual token)
    console.log(`Token present: ${!!token}`);
    
    // Parse URL more carefully
    const url = new URL(req.url);
    const pathname = url.pathname;
    
    console.log(`Request path: ${pathname}`);

    // Define unprotected routes - be more flexible with trailing slashes
    const unprotectedPaths = ["/signin", "/forgot-password", "/reset-password"];
    
    // More robust path checking that handles trailing slashes
    const isUnprotected = unprotectedPaths.some(path => 
      pathname === path || pathname === `${path}/`
    );
    
    console.log(`Is unprotected route: ${isUnprotected}`);

    if (token && isUnprotected) {
      console.log("Authenticated user accessing unprotected route, redirecting to home");
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (!token && !isUnprotected) {
      console.log("Unauthenticated user accessing protected route, redirecting to signin");
      return NextResponse.redirect(new URL("/signin", req.url));
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
    // Match all paths except specific ones
    "/((?!api|_next/static|_next/image|fonts|favicon.ico|public).*)",
  ],
};