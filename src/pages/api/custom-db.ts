import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { Generated } from 'kysely';
import { createKysely } from '@vercel/postgres-kysely';

export const config = {
  runtime: 'experimental-edge',
  location: 'iad1'
};

interface UsersTable {
  user_id: Generated<number>;
  email: string;
  username: string;
  password: string;
}

interface Database {
    users: UsersTable
}

export default async (req: NextRequest) => {
    try {
        const { email, password, api_key } = await req.json();
        const cached_key = await kv.get('api_key');

        if (cached_key !== api_key) {
            return new NextResponse(null, { status: 400, statusText: 'API Key is invalid' });
        }

        const db = createKysely<Database>();
        const user = await db
                    .selectFrom('users')
                    .selectAll()
                    .where('users.email', '=', email)
                    .executeTakeFirst();

        if (email === user?.email && password === user?.password) {
            return NextResponse.json({
                user_id: user?.user_id,
                nickname: user?.email.includes('kelly') ? 'Kelly Clarkson' : 'Sam Yapkowitz',
                email: user?.email
            });
        } else {
            return new NextResponse(null, { status: 400, statusText: 'User not found' });
        }

        // return NextResponse.json({
        //             user_id: '4534854850934805',
        //             nickname: 'Sam Yapkowitz',
        //             email: 'sam@customdb.com'
        // });
    } catch (e) {
        console.log(e);
        return new NextResponse(null, { status: 400, statusText: e as string });
    }
   
};