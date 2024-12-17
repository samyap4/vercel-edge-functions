import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
  location: 'iad1'
};

export default (req: NextRequest) => {
    const commands = [
        {
            type: "com.okta.access.patch",
            value: [{
                "op": "replace",
                "path": "/claims/aud",
                "value": "http://fake-audience.com"
            }]
        }
    ];
  return NextResponse.json({
    commands
  });
};