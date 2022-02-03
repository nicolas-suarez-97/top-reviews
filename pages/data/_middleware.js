import { NextResponse } from 'next/server'

export async function middleware(req, ev) {
    if (process.env.SCOPE !== 'dev') {
        if (process.env.PASSWORD === req.nextUrl.searchParams.get('pass')) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect('/');
        }
    }
    return NextResponse.next();
}