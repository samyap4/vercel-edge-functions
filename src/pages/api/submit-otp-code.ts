import { NextApiRequest, NextApiResponse } from 'next';
import { addMessage } from "@/utils/kv-store"

interface Message {
    recipient: string
    sender: string
    body: string
    id?: string
    timestamp?: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    // Store the message
    await addMessage(req.body as Message)

    // Return success response with the stored message
    return res.status(200).json({
        success: true,
        message: req.body,
      })
  } catch (error) {
    console.error("Error processing message:", error)
    return res.status(500).json({ error: "Failed to process message" })
  }
}