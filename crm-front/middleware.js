import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = new URL(req.url);

  // If the user is not authenticated, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Define role-based access for different routes
  const adminRoutes = ['/admin', '/admin/dashboard', '/admin/settings'];
  const managerRoutes = ['/manager', '/manager/dashboard', '/manager/reports'];

  // Check if trying to access admin route without admin role
  if (adminRoutes.some(route => pathname.startsWith(route)) && token.user.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Check if trying to access manager route without manager role
  if (managerRoutes.some(route => pathname.startsWith(route)) ){
    if (token.user.role !== "manager" && token.user.role !== "admin") {
      // Admins can typically access manager routes too
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  // Allow the request to continue if authenticated and authorized
  return NextResponse.next();
}

// Define the paths that should be protected
export const config = {
  matcher: [
    '/admin/:path*',
    '/manager/:path*',
    // Add other protected paths here
  ],
};