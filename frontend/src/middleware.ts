import { NextRequest, NextResponse } from 'next/server';
import { getCookieServer } from './lib/cookieServer';
import { api } from './services/api';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/_next") || pathname === '/') {
        return NextResponse.next();
    } else {
        const token: string = await getCookieServer() as string;
        if (await validateToken(token)) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/", req.url));
    }
}

async function validateToken(token: string) {
    if (!token) return false;

    try {
        await api.get("/user/info", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}