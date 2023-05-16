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
        const json = await req.json();
        const { email, password } = json;

        const db = createKysely<Database>();
        const user = await db
          .selectFrom('users')
          .where('users.email', '=', email)
          .executeTakeFirst();

        const creds = await kv.hgetall('user:me');
        console.log('user', user);

        if (email === creds?.email && password === creds?.password) {
            return NextResponse.json({
                user_id: '4534854850934805',
                nickname: 'Sam Yapkowitz',
                email: 'sam@customdb.com'
              });
        }
    } catch (e) {
        console.log(e);
        return new NextResponse(null, { status: 400, statusText: e as string });
    }
   
};