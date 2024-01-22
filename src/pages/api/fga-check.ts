import { NextApiRequest, NextApiResponse } from 'next';
import { OpenFgaClient, CredentialsMethod } from '@openfga/sdk';
import { kv } from '@vercel/kv';
import { checkIsJwtExpired, renewFGAJWT } from '@/utils/token_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { user, relation, object } = req.body;
    let api_token = await kv.get('fga_token') as string;

    if (checkIsJwtExpired(api_token)) {
        api_token = renewFGAJWT();
        await kv.set('fga_token', api_token);
    }
    
    const fgaClient = new OpenFgaClient({
        apiHost: 'api.us1.fga.dev', 
        storeId: '01GJ3SQKTDV7AXQWMPYYZGEF0B',
        credentials: {
            method: CredentialsMethod.ApiToken,
            config: {
                token: api_token,
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