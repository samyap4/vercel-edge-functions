import { NextApiRequest, NextApiResponse } from 'next';
import { OpenFgaClient, CredentialsMethod } from '@openfga/sdk';

// export const config = {
//   runtime: 'experimental-edge',
//   location: 'iad1'
// };

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { user, relation, object } = req.body;
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
    return res.status(200).json({
        result: result
    });
};