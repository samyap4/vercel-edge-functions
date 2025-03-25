import { NextApiRequest, NextApiResponse } from 'next';
import { getMessages } from "@/utils/kv-store"

interface Message {
    recipient: string
    sender: string
    body: string
    id?: string
    timestamp?: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Retrieve all messages
    const messages = await getMessages()

    // Log for debugging
    console.log(`Retrieved ${messages.length} messages from KV store`)

    // Return with CORS headers
    return res.status(200).json(messages)
  } catch (error) {
    console.error("Error retrieving messages:", error)
    return res.status(500).json({ error: "Failed to retrieve messages" })
  }
}