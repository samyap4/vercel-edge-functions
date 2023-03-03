import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async (req: NextRequest) => {
    try {
        console.log(req);
        const json = await req.json();
        const { email, password } = json;
        if (email === 'sam@custmodb.com' && password === 'Auth0Dem0') {
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