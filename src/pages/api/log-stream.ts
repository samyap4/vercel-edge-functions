import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {

    console.log('req: ', req);

    return res.status(200).json({
        success: true
    });
};