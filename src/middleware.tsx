import { NextRequest, NextResponse } from 'next/server';

function isLocalhost(url: string) {
  return url.includes('localhost') || url.includes('127.0.0.1');
}
function localUrl() {
  return NextResponse.rewrite(new URL('http://www.mbz2.ir:80/'));
}

export async function middleware(req: NextRequest, res: NextResponse) {
  const { href, pathname, port, searchParams } = req.nextUrl;
  const access_token = req.cookies.get('access_token')?.value ?? undefined;
  const has_token = req.cookies.has('access_token');

  if (pathname.startsWith('/_next')) return NextResponse.next();
  if (isLocalhost(href)) localUrl();
  return NextResponse.next();
}

export const config = {
  matcher: ['/']
};
