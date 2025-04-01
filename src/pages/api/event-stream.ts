import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    // Check for the API token in the request headers
    const token = req.headers['authorization'];

    if (token !== `Bearer ${process.env.AUTH0_EVENT_STREAM_API_TOKEN}`) {
        // If the token is invalid, respond with a 401 Unauthorized
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // If the token is valid, process the webhook payload
    console.log('Webhook received:', JSON.stringify(req.body, null, 2));

    // Respond to the webhook sender
    res.status(204); // No Content
  } catch (error) {
    console.error("Error processing message:", error)
    return res.status(500).json({ error: "Failed to process message" })
  }
}