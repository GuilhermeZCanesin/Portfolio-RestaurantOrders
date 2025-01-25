import { NextRequest, NextResponse } from 'next/server';
import { getCookieServer } from './lib/cookieServer';
import { api } from './services/api';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token: string = await getCookieServer() as string;
    const tokenIsValid: boolean = await validateToken(token);

    if (pathname.startsWith("/_next") || pathname === '/') {
        if (tokenIsValid && (pathname === '/' || pathname === '/register')) {
            return NextResponse.redirect(new URL("/main", req.url));
        }
        return NextResponse.next();
    } else {
        if (tokenIsValid) {
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