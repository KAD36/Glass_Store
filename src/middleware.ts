import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    if (path.startsWith('/admin') || path.startsWith('/studio')) {
        const token = request.cookies.get('token')?.value;
        const verifiedToken = token && (await verifyToken(token));

        if (path === '/admin/login') {
            if (verifiedToken) {
                return NextResponse.redirect(new URL('/admin/dashboard', request.url));
            }
            return NextResponse.next();
        }

        if (!verifiedToken) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/studio/:path*'],
};
