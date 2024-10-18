import { NextRequest, NextResponse } from 'next/server';

  export default (req: NextRequest) => {

    console.log('req: ', req);

    return NextResponse.json({
        success: true
      });
};