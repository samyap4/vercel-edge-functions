import { NextApiRequest, NextApiResponse } from 'next';
import { OpenFgaClient, CredentialsMethod } from '@openfga/sdk';
import { getFGAJWT } from '@/utils/token_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // Parse FGA fields
    const { user, relation, object } = req.body;

    const fga_token = await getFGAJWT();

    if (fga_token) {
        // Instantiate FGA client
        const fgaClient = new OpenFgaClient({
            apiHost: 'api.us1.fga.dev', 
            storeId: '01GJ3SQKTDV7AXQWMPYYZGEF0B',
            credentials: {
                method: CredentialsMethod.ApiToken,
                config: {
                    token: fga_token || '',
                }
            } 
        });

        // Check Result
        const result = await fgaClient.check({
            user: user,
            relation: relation,
            object: object,
        });
        return res.status(200).json({
            result: result
        });
    }
};