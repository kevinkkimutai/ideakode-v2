import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname, origin } = request.nextUrl;
  const publicRoutes = ['/signin', '/signup', '/forgot-password', '/reset-password'];
  const isPublicRoute = publicRoutes.includes(pathname);
  
  // Get token
  const token = request.cookies.get('token')?.value;

  // Redirect logic
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/signin', origin));
  }

  if (token && (pathname === '/signin' || pathname === '/fc')) {
    return NextResponse.redirect(new URL('/', origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images/).*)'],
};