import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import { kv } from "@vercel/kv";
import { Generated } from "kysely";
import { createKysely } from "@vercel/postgres-kysely";
import crypto from "crypto"

// export const config = {
//   runtime: "experimental-edge",
//   location: "iad1",
// };

// interface UsersTable {
//   user_id: Generated<number>;
//   email: string;
//   username: string;
//   password: string;
// }

// interface Database {
//   users: UsersTable;
// }

export default async (req: NextApiRequest) => {
  try {
    const { email, password, api_key } = req.body;

    // const db = createKysely<Database>();
    // const user = await db
    //   .selectFrom("users")
    //   .selectAll()
    //   .where("users.email", "=", email)
    //   .executeTakeFirst();

    // if (email === user?.email && password === user?.password) {
    //   return NextResponse.json({
    //     user_id: user?.user_id,
    //     nickname: user?.email.includes("rashmi")
    //       ? "Rashmi Menon"
    //       : "Sam Yapkowitz",
    //     email: user?.email,
    //   });
    // } else {
    //   return new NextResponse(null, {
    //     status: 400,
    //     statusText: "User not found",
    //   });
    // }

    if (email.split('@')[1] === 'customdb.com' && password === 'Auth0Dem0') {
      return new NextResponse.json({
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
