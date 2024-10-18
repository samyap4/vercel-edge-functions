import { NextRequest, NextResponse } from 'next/server';

export const config = {
    runtime: 'experimental-edge',
    location: 'iad1'
  };

  export default (req: NextRequest) => {

    console.log('req: ', req);

    return NextResponse.json({
        success: true
      });
};