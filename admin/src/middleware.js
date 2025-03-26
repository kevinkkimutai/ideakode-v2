import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public routes that do not require authentication
  const publicRoutes = ['/signin', '/signup','/forgot-password','/reset-password'];

  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(pathname);

  // Get the token from cookies
  const token = request.cookies.get('token')?.value;

  // If there's no token and the route is not public, redirect to signin
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // If the user is authenticated and tries to access signin or home page, redirect to dashboard
  if (token && (pathname === '/signin' || pathname === '/fc')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Proceed with the request if no redirects are triggered
  return NextResponse.next();
}

// Config to apply the middleware to all routes except for API, static, and image paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
