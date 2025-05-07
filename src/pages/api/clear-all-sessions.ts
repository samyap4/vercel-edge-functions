import type { NextApiRequest, NextApiResponse } from 'next';
import { ManagementClient } from 'auth0'; // User type might contain app_metadata typing

interface ClearSessionsDevicesRequestBody {
  userId: string;
}

interface Auth0Error extends Error {
  statusCode?: number;
  error?: string;
  errorCode?: string;
}

let management: ManagementClient | undefined;

async function getManagementClient(): Promise<ManagementClient> {
  if (!management) {
    if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_MANAGEMENT_CLIENT_ID || !process.env.AUTH0_MANAGEMENT_CLIENT_SECRET) {
      console.error('Auth0 Management API credentials are not configured in environment variables.');
      throw new Error('Server configuration error: Auth0 credentials missing.');
    }

    management = new ManagementClient({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
      clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
    });
  }
  return management;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  const { userId } = req.body as ClearSessionsDevicesRequestBody;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  try {
    const auth0Management = await getManagementClient();

    await auth0Management.users.deleteSessions({ user_id: userId });
    console.log(`Successfully deleted all sessions for user ${userId}`);

    const updatedAppMetadata = { // Use our custom type
      app_metadata: {
        active_devices: [],
      }
    };

    await auth0Management.users.update({ id: userId }, updatedAppMetadata);
    console.log(`Successfully updated app_metadata for user ${userId}, clearing active_devices.`);

    return res.status(200).json({ message: `Successfully processed user ${userId}. Sessions deleted and active_devices array cleared in app_metadata.` });

  } catch (error) {
    const err = error as Auth0Error;
    console.error(`Error processing user ${userId}:`, err.message, err);
    
    const statusCode = err.statusCode || 500;
    
    return res.status(statusCode).json({
        error: 'Failed to process user request.',
        details: err.message,
        auth0Error: err.error ? {
            error: err.error,
            errorCode: err.errorCode,
            message: err.message,
        } : undefined
    });
  }
}