import { NextApiRequest, NextApiResponse } from 'next';
import { addMessage } from "@/utils/kv-store"

interface Message {
    recipient: string
    sender: string
    body: string
    id?: string
    timestamp?: string
}

// This is just to keep upstash alive - runs once a day

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const fakeMessage = {
        recipient: "6789834094",
        sender: "support@samyap.dev",
        body: "Your verification code is: 8675309"
    }
    // Store the message

    await addMessage(fakeMessage as Message)

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