import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { OpenFgaClient, CredentialsMethod } from '@openfga/sdk';

export const config = {
  runtime: 'experimental-edge',
  location: 'iad1'
};

export default async (req: NextRequest) => {
    const { user, relation, object } = await req.json();
    const fgaClient = new OpenFgaClient({
        apiHost: 'api.us1.fga.dev', 
        storeId: '01GJ3SQKTDV7AXQWMPYYZGEF0B',
        credentials: {
            method: CredentialsMethod.ClientCredentials,
            config: {
                apiTokenIssuer: 'fga.us.auth0.com',
                apiAudience: 'https://api.us1.fga.dev/',
                clientId: process.env.FGA_CLIENT_ID || '',
                clientSecret: process.env.FGA_CLIENT_SECRET || '',
            }
        } 
    });
    const result = await fgaClient.check({
        user: user,
        relation: relation,
        object: object,
    });
    return NextResponse.json({
       result: result
    });
};