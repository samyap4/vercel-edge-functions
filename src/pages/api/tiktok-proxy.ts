import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async (req: NextRequest) => {
   const TIKTOK_ACCESS_TOKEN_ENDPOINT = 'https://open-api.tiktok.com/oauth/access_token';

   const params = req.nextUrl.searchParams;
   const client_id = params.get('client_id');
   const client_secret = params.get('client_secret');
   const code = params.get('code');


   const url = `${TIKTOK_ACCESS_TOKEN_ENDPOINT}?client_key=${client_id}&client_secret=${client_secret}&code=${code}&grant_type=authorization_code`;
   const response = await fetch(url, { method: 'POST' });
   const data = await response.json();

   
   return NextResponse.json({
     data: data.data
   });

  
};