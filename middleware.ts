import { NextRequest, NextResponse } from 'next/server';
import { checkAudience } from '@/utils/token_utils';
import next from 'next';

export const config = {
    matcher: '/api/fga-check',
};

export default async function middleware(req: NextRequest) {
    const json = await new Response(req.body).json();
    const token = json.token;
    if (!checkAudience(token, 'http://localhost:8080')) {
        return NextResponse.json({ message: 'Auth required' }, { status: 401 })
    }
    return NextResponse.next();
}