import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/session';

// Określ, które ścieżki są chronione, a które publiczne
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/auth/login'];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => 
    route === '/' ? path === '/' : path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);

  // Pobranie i weryfikacja tokenu
  const cookie = req.cookies.get('session')?.value;
  const session = await decrypt(cookie);

  // Przekierowania ze względu na brak uprawnień
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/auth/login?redirect='+path, req.nextUrl));
  }

  // Przekierowanie zalogowanego użytkownika ze strony logowania
  if (isPublicRoute && session && path === '/auth/login') {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  // Odświeżenie sesji (Sliding Expiration) - opcjonalne, ale świetne dla PWA
  const res = NextResponse.next();
  if (session && cookie) {
    res.cookies.set('session', cookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Odnowienie na kolejne 7 dni
    });
  }

  return res;
}

// Filtrowanie middleware, aby nie odpalał się na plikach statycznych i obrazkach
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};