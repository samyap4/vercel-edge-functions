import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default (req: NextRequest) => {
   const params = req.nextUrl.searchParams;
   const mfa = params.get('email') === 'sam@glitch.com';
   return NextResponse.json({
     mfa: mfa
   });
};