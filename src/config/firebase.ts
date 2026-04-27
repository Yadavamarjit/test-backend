import * as admin from 'firebase-admin';
import { logger } from './logger';

try {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error('Missing Firebase environment variables. Check your Vercel Dashboard.');
  }

  const serviceAccount = {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  } as admin.ServiceAccount;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  logger.info('Firebase Admin initialized from environment variables');
} catch (error) {
  logger.error('Firebase Admin initialization failed:', error);
}

export const db = admin.firestore();
export const auth = admin.auth();
export default admin;
