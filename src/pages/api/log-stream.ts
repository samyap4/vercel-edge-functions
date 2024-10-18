import { NextApiRequest, NextApiResponse } from 'next';
//import { headers } from 'next/headers';

export const config = {
    runtime: 'experimental-edge',
    location: 'iad1'
};

export default async (req: NextApiRequest, res: NextApiResponse) => {

    console.log('req: ', req);

    return res.status(200).json({
        success: true
    });
};