import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let dd_api_key = req.headers['DD-API-KEY'] ?? '';
    console.log(req.headers);

    console.log('DD-API-KEY', dd_api_key);

    return res.status(200).json({
        success: dd_api_key ?? 'false'
    });
};