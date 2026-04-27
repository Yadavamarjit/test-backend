import * as admin from 'firebase-admin';
import { logger } from './logger';

try {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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
