import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname, origin } = request.nextUrl;
  const publicRoutes = ['/signin', '/signup', '/forgot-password', '/reset-password'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Debugging: Log all cookies
  const allCookies = request.cookies.getAll();
  console.log('All cookies:', allCookies);
  
  // Get token
  const token = request.cookies.get('token')?.value;
  console.log("Token from cookies:", token);
  console.log("Request URL:", request.url);

  // Redirect logic
  if (!token && !isPublicRoute) {
    console.log(`Redirecting to signin from ${pathname} - no token found`);
    return NextResponse.redirect(new URL('/signin', origin));
  }

  if (token && (pathname === '/signin' || pathname === '/fc')) {
    console.log(`Redirecting to dashboard from ${pathname} - user already authenticated`);
    return NextResponse.redirect(new URL('/', origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images/).*)'],
};