import { NextResponse } from 'next/server';
import { auth } from './auth';

const publicRoutes = ['/auth/login', '/auth/register'];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  if (isLoggedIn && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  if (!isLoggedIn && !publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl));
  }

  // Permite el acceso
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|trpc|.*\\..*).*)']
};
