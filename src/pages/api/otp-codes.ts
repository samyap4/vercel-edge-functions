import { NextResponse } from "next/server"
import { addMessage, getMessages } from "@/utils/kv-store"

interface Message {
    recipient: string
    sender: string
    body: string
    id?: string
    timestamp?: string
}

// Helper function to add CORS headers
function corsHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
  return response
}

// Handle OPTIONS requests (preflight)
export async function OPTIONS() {
  return corsHeaders(new NextResponse(null, { status: 200 }))
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the incoming data
    if (!body.recipient || !body.sender || !body.body) {
      return corsHeaders(NextResponse.json({ error: "Missing required fields" }, { status: 400 }))
    }

    // Store the message
    await addMessage(body as Message)

    // Return success response with the stored message
    return corsHeaders(
      NextResponse.json({
        success: true,
        message: body,
      }),
    )
  } catch (error) {
    console.error("Error processing message:", error)
    return corsHeaders(NextResponse.json({ error: "Failed to process message" }, { status: 500 }))
  }
}

export async function GET() {
  try {
    // Retrieve all messages
    const messages = await getMessages()

    // Log for debugging
    console.log(`Retrieved ${messages.length} messages from KV store`)

    // Return with CORS headers
    return corsHeaders(NextResponse.json(messages))
  } catch (error) {
    console.error("Error retrieving messages:", error)
    return corsHeaders(NextResponse.json({ error: "Failed to retrieve messages" }, { status: 500 }))
  }
}

