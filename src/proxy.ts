import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * Hostname default yang diizinkan untuk aplikasi publik.
 * Otomatis mengizinkan localhost, 127.0.0.1, dan domain instansi pemerintah (*.go.id).
 */
const DEFAULT_ALLOWED_HOSTS = [
  'localhost',
  '127.0.0.1',
  'go.id',
  'muaraenimkab.go.id',
];

function getAllowedHosts(): string[] {
  const envHosts = process.env.ALLOWED_HOSTS;
  if (envHosts) {
    const extraHosts = envHosts
      .split(',')
      .map((h) => h.trim().toLowerCase())
      .filter(Boolean);
    return [...DEFAULT_ALLOWED_HOSTS, ...extraHosts];
  }
  return DEFAULT_ALLOWED_HOSTS;
}

/**
 * Memvalidasi hostname request di SELURUH HALAMAN PUBLIK.
 * Mencegah Host Header Injection & Web Cache Poisoning dari domain jahat (misal casino.com).
 */
function isHostAllowed(request: NextRequest): boolean {
  const allowedHosts = getAllowedHosts();

  const requestHost = request.nextUrl.hostname.toLowerCase();
  const hostHeader = request.headers.get('host')?.split(':')[0]?.toLowerCase();

  const isRequestHostValid = allowedHosts.some(
    (allowed) => requestHost === allowed || requestHost.endsWith(`.${allowed}`)
  );

  const isHostHeaderValid = !hostHeader || allowedHosts.some(
    (allowed) => hostHeader === allowed || hostHeader.endsWith(`.${allowed}`)
  );

  return isRequestHostValid && isHostHeaderValid;
}

function safeRedirect(request: NextRequest, pathname: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url);
}

export async function proxy(request: NextRequest) {
  // 1. Validasi Host Header di SELURUH Halaman
  if (!isHostAllowed(request)) {
    return new NextResponse('Bad Request: Invalid Host Header', { status: 400 });
  }

  // 2. Proteksi Khusus Rute /admin (jika ada)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return safeRedirect(request, '/signin');
    }
  }

  // 3. Tambahkan Security Headers di SELURUH Halaman Publik
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  );

  return response;
}

/**
 * Jalankan proxy di SELURUH halaman aplikasi (kecuali aset statis)
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
