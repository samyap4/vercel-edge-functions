import { NextRequest, NextResponse } from 'next/server';
import { checkAudience } from '@/utils/token_utils';

export const config = {
    matcher: '/api/fga-check',
};

export default async function middleware(req: NextRequest) {
    const requestHeaders = new Headers(req.headers)
    console.log(requestHeaders);
    const token = requestHeaders.get('Authorization')?.split(' ')[1];
    if (token && checkAudience(token, 'http://localhost:8080')) {
        return NextResponse.next();
    }
    return NextResponse.json({ message: requestHeaders }, { status: 401 })
}