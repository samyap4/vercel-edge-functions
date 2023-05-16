import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
  location: 'iad1'
};

export default (req: NextRequest) => {
    const commands = [
        {
            type: "com.okta.access.patch",
            value: [
              {
                op: "add",
                path: "/claims/legacy_permissions",
                value: ["can:read", "can:write", "can:destroy"]
              }
            ]
        },
        {
          type: "com.okta.identity.patch",
          value: [
            {
              op: "add",
              path: "/claims/ref_code",
              value: "8675309"
            }
          ]
        }
    ];
  return NextResponse.json({
    commands
  });
};