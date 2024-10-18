import { NextApiRequest, NextApiResponse } from 'next';
import { headers } from 'next/headers';

export const config = {
    runtime: 'experimental-edge',
    location: 'iad1'
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const headersList = headers();

    console.log('headersList: ', headersList);

    let dd_api_key = headersList.get('DD-API-KEY');

    console.log('DD-API-KEY', dd_api_key);

    return res.status(200).json({
        success: dd_api_key
    });
};