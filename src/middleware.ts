import { NextRequest, NextResponse } from 'next/server';
import { checkAudience } from '@/utils/token_utils';

export const config = {
    matcher: '/api/fga-check',
};

export default async function middleware(req: NextRequest) {
    const headers = req.headers;
    console.log(headers);
    const token = headers.get('Authorization')?.split(' ')[1];
    if (token && checkAudience(token, 'http://localhost:8080')) {
        return NextResponse.next();
    }
    return NextResponse.json({ message: headers }, { status: 401 })
}