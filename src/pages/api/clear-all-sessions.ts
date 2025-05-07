import type { NextApiRequest, NextApiResponse } from 'next';
import { ManagementClient } from 'auth0'; // User type might contain app_metadata typing

// Define a custom interface for your app_metadata structure
interface MyAppMetadata {
  active_devices?: any[]; // Be more specific if you know the type, e.g., string[] or a custom Device[]
  [key: string]: any; // Allows for other properties you might have in app_metadata
}

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

    let existingAppMetadata: MyAppMetadata = {}; // Use our custom type
    try {
      const userResponse = await auth0Management.users.get({ id: userId });
      // The userResponse.data is of type User from 'auth0' SDK.
      // User['app_metadata'] is typically typed as Record<string, any> or similar by the SDK.
      if (userResponse && userResponse.data && userResponse.data.app_metadata) {
        existingAppMetadata = userResponse.data.app_metadata as MyAppMetadata; // Cast if necessary, or ensure compatibility
      }
    } catch (getUserError) {
      const typedGetUserError = getUserError as Auth0Error;
      console.warn(`Could not fetch existing app_metadata for user ${userId}: ${typedGetUserError.message}. Proceeding to clear active_devices.`);
    }

    const updatedAppMetadata: MyAppMetadata = { // Use our custom type
      ...existingAppMetadata,
      active_devices: [],
    };

    // The second argument for updateAppMetadata is often typed as Record<string, any>
    // or a specific UserAppMetadataUpdate type by the SDK, which should be compatible
    // with our MyAppMetadata if structured correctly.
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