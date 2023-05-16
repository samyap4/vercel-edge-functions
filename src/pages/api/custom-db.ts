import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const config = {
  runtime: 'edge',
};

export default async (req: NextRequest) => {
    try {
        const json = await req.json();
        const { email, password } = json;
        const creds = await kv.hgetall('user:me');
        console.log('creds', creds);
        if (email === creds?.email && password === creds?.password) {
            return NextResponse.json({
                user_id: '4534854850934805',
                nickname: 'Sam Yapkowitz',
                email: 'sam@customdb.com'
              });
        }
    } catch (e) {
        console.log(e);
        return new NextResponse(null, { status: 400, statusText: "Bad Request" });
    }
   
};