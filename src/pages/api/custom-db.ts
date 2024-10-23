import { NextApiRequest, NextApiResponse } from 'next';
import crypto from "crypto"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;

    if (email.split('@')[1] === 'customdb.com' && password === 'Auth0Dem0') {
      return res.status(200).json({
        user_id: crypto.randomUUID(),
        nickname: email,
        email: email
      });
    } else {
      return res.status(400).json({
          statusText: "User not found",
        });
    }

   
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      statusText: e,
    });
  }
};
