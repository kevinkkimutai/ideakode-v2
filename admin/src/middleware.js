import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public routes that do not require authentication
  const publicRoutes = ['/signin', '/signup', '/forgot-password', '/reset-password'];

  // Allow access to image and upload paths without auth
  const isImagePath = pathname.startsWith('/images/') || pathname.startsWith('/uploads/');

  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(pathname);

  // Get the token from cookies
  const token = request.cookies.get('token')?.value;
  console.log("token", token);

  // Allow unauthenticated access to images and public routes
  if (!token && !isPublicRoute && !isImagePath) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Redirect authenticated users away from signin or welcome page
  if (token && (pathname === '/signin' || pathname === '/fc')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Match all routes except those explicitly excluded
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
};
