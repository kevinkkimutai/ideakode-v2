import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const session = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const token = session?.user?.token;
  const { pathname } = new URL(req.url);

  const unprotectedRoutes = ["/signin", "/forgot-password", "/reset-password"];

  const isUnprotected = unprotectedRoutes.includes(pathname);

  if (token && isUnprotected) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && !isUnprotected) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
