import * as admin from 'firebase-admin';
import { logger } from './logger';

let db: admin.firestore.Firestore;
let auth: admin.auth.Auth;

try {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error('Missing Firebase environment variables. Check your Vercel Dashboard.');
  }

  // Clean the private key: strip quotes and handle newlines
  const privateKey = FIREBASE_PRIVATE_KEY
    .replace(/^['"]|['"]$/g, '')
    .replace(/\\n/g, '\n');

  const serviceAccount = {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey,
  } as admin.ServiceAccount;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  logger.info('Firebase Admin initialized successfully');
} catch (error) {
  logger.error('Firebase Admin initialization failed:', error);
}

db = admin.firestore();
auth = admin.auth();

export { db, auth };
export default admin;
// 

