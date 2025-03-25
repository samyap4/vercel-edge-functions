import { kv } from "@vercel/kv"

interface Message {
    recipient: string
    sender: string
    body: string
    id?: string
    timestamp?: string
}
  

// Prefix for message keys
const MESSAGE_PREFIX = "message:"
// 24 hours in seconds
const TTL_24_HOURS = 60 * 60 * 24

export async function addMessage(message: Message): Promise<void> {
  try {
    // Add timestamp and ID
    const timestamp = new Date().toISOString()
    const id = Date.now().toString()

    const messageWithMeta = {
      ...message,
      id,
      timestamp,
    }

    // Store message with 24-hour expiration
    const key = `${MESSAGE_PREFIX}${id}`
    await kv.set(key, messageWithMeta, { ex: TTL_24_HOURS })

    console.log(`Stored message with key: ${key}`)

    // Also update the message index for faster retrieval
    await updateMessageIndex(id)
  } catch (error) {
    console.error("Error saving message to KV store:", error)
    throw error
  }
}

// Keep track of message IDs for efficient retrieval
async function updateMessageIndex(newId: string): Promise<void> {
  try {
    const indexKey = "message_index"
    const currentIndex = (await kv.get<string[]>(indexKey)) || []

    // Add new ID to the beginning of the array
    const updatedIndex = [newId, ...currentIndex]

    // Store updated index with same TTL
    await kv.set(indexKey, updatedIndex, { ex: TTL_24_HOURS })
    console.log(`Updated message index, now contains ${updatedIndex.length} messages`)
  } catch (error) {
    console.error("Error updating message index:", error)
  }
}

export async function getMessages(): Promise<Message[]> {
  try {
    // Get message IDs from index
    const indexKey = "message_index"
    const messageIds = (await kv.get<string[]>(indexKey)) || []

    console.log(`Found ${messageIds.length} message IDs in index:`, messageIds)

    if (messageIds.length === 0) {
      return []
    }

    // Get all messages in parallel
    const messageKeys = messageIds.map((id) => `${MESSAGE_PREFIX}${id}`)
    console.log("Fetching messages with keys:", messageKeys)

    // Use individual gets instead of mget to debug
    const messagesPromises = messageKeys.map((key) => kv.get<Message>(key))
    const messagesResults = await Promise.all(messagesPromises)

    console.log("Raw message results:", messagesResults)

    // Filter out any null values (expired messages)
    const messages = messagesResults.filter(Boolean) as Message[]
    console.log(`Retrieved ${messages.length} valid messages from KV store`)

    return messages
  } catch (error) {
    console.error("Error retrieving messages from KV store:", error)
    return []
  }
}

// For debugging: directly store a test message
export async function addTestMessage(): Promise<void> {
  const testMessage: Message = {
    sender: "test@example.com",
    recipient: "recipient@example.com",
    body: "This is a test message created at " + new Date().toLocaleString(),
  }

  await addMessage(testMessage)
}

