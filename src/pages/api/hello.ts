import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
  location: 'iad1'
};

export default (req: NextRequest) => {
  console.log('Hello Baselime')
  return NextResponse.json({
    name: `Hello, from ${req.url} I'm now an Edge Function!`,
  });
};
