import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from "crypto"

export default async (req: NextRequest) => {
  try {
    const { email, password, api_key } = req.body;

    if (email.split('@')[1] === 'customdb.com' && password === 'Auth0Dem0') {
      return NextResponse.json({
        user_id: crypto.randomUUID(),
        nickname: email,
        email: email
      });
    } else {
         return new NextResponse(null, {
          status: 400,
          statusText: "User not found",
        });
    }

   
  } catch (e) {
    console.log(e);
    return new NextResponse(null, { status: 400, statusText: e as string });
  }
};
