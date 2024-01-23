import { NextApiRequest, NextApiResponse } from 'next';
import { OpenFgaClient, CredentialsMethod } from '@openfga/sdk';
import { kv } from '@vercel/kv';
import { checkIsJwtExpired, renewFGAJWT } from '@/utils/token_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { user, relation, object } = req.body;
    let cached_token = await kv.get('fga_token');
    console.log('cached_token', cached_token);
    let api_token = cached_token?.toString();

    if (!api_token || checkIsJwtExpired(api_token)) {
        console.log('renewing tokens');
        api_token = await renewFGAJWT();
        await kv.set('fga_token', api_token);
    }

    const fgaClient = new OpenFgaClient({
        apiHost: 'api.us1.fga.dev', 
        storeId: '01GJ3SQKTDV7AXQWMPYYZGEF0B',
        credentials: {
            method: CredentialsMethod.ApiToken,
            config: {
                token: api_token || '',
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