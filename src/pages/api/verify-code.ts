import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { invite_code } = req.body;

    return res.status(200).json({
        result: invite_code === '000-000'
    });
};