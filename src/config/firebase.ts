import * as admin from 'firebase-admin';
import { logger } from './logger';

let db: admin.firestore.Firestore;
let auth: admin.auth.Auth;

try {
  // Use a template literal to preserve actual newlines
  const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCv3GW3G21wKHqF
DXNoj2JwQn7x7AanIN+XoyYMn24ko2ggVZAz5guYxwI8XVenx44QHdRvTXb9ghgT
yIyTHfyPeYvYCyqh7Tr1gXZlo4nofevCcjfOkkaqek5Kh3pX6aVtRXity7CMO1fv
FT2k7jMsHgtA2duwluktj9CBVSM1nSsJjIYhMq/Oylb9PVzM/A+RzlKLR6hiWqJl
HeNKm3sgmBaB2+ooXADrIXGAnRnyorUlZIyE3wSfkXz8t9JUnpQi7nNT6Yf9md/X
Yd8GJAotl8xmcpTs3fkEGtncooWTok1JtbnAm2PUGjRLPFzgEC7qmRribFtQ4Kwr
kq8XriiLAgMBAAECggEAGF4otfOV+XmSaIdRm4ZqtHVyU6FJ1rSmZsOTjSI2R9tg
nnUJd5eMVbkj9FVI1yCjNlYwcmIOaXkw9e9hJKkV4boUADKKXeLJ/fe8/cZv0iwOP
vHTJKNV59ztVR9x35mCYrIh4zVQxFW1PpPBDh2v+KTnMg2Lsnw56JvcLhDBA3be7
ndP6vQzrTDx6ncXkxSKEDz0+Z4ppdgqKjbqu5CEt+SKGKwhGar+YmIi0LMIRnpxP
eASeMwg/zarA8abNhqqVxpOc70pvvAk1Z8KsrRxmyygYQdqZqsI2xsoty1V0B1/a
zWdsUMVuku9eMO7FBSQXLbWbYA0ks1AZSQUshABacQKBgQDbmp2iNko9CHjUvTq0
kyok4uy9LQOMYumQWNj6nYvTayaM7tkuXJlpTAeacULLmYOYBDXu1/ZPrQ/TqNNU
7vP8I2ClyVP4GmHwz41AO9G3lBoX7TRfaI48089rpOsx3IUsZzRZsNBwOwca9RSy
eROG6vg7IAs4A2hemQFBG2jdeQKBgQDNAdiwL9DXxxX5YH/6UQNNKQXnNkTB+NhQ
/X2VPJs5eWIbyKxfagz6V3zwTku4hgDOd927CCZWHbUJMWTr+ePdZjat25DTRz2k
3JVuuy5TZsA5Mm6R1NPZl2rnMqKDFKAuonMeXy9bcTbtAyJlMlLTh9ogheVNk2qy
vuYvHXupIwKBgQC6k/3z8M5YVpdaoD99Zj97QXXEMLeAEhXA90u6ehpvkO0a9l99
XV1WMiuPk0Ud+JrukD1GZSQ3g6Ebwqdy1OZkxaX6lTgLZlbqI10uQuSmZWVaCMXj
fdDDa24iVech4Osg07qNrYUapXwe8jUYgXgOvBoVGd+OQo7tOG/xYhlReQKBgQCa
nkcrURKkdGDFcPkMf89ceZVDbHJLJAZvvrMD0Nab/taKgOjSlGCvC0RYVhaMX9IlF
IyFeNG3bPjjSPpjORzJkKv4NJeBTPIKg++P7gkwSfAVw2rJ9Z893XvAuc4IOfQ2t
O7S6cKAfPQRhvZxAWqoSbXqsTOgwDndDYCXj3kHvqwKBgEzv/LBqcV2D7c4quafh
j+MQRmlLG9m/s4F615R9mPM3CAbX7kIB0V9X6c/DyNAETNbGvFkNVoE8AQipPGnR
RGuE7mEc+j4lfQDegXbvOpNh2oY4wjXVXv0fNmhEKZdzYvJPmHT3VdyDlj2WqSlY
QdhslwzDYN0e0xr2jbjmyV+u
-----END PRIVATE KEY-----`;

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "gen-lang-client-0456258653",
      clientEmail: "firebase-adminsdk-fbsvc@gen-lang-client-0456258653.iam.gserviceaccount.com",
      privateKey: privateKey,
    })
  });

  logger.info('Firebase Admin initialized successfully (TEMPLATE LITERAL)');
} catch (error: any) {
  logger.error('Firebase Admin initialization failed:', error.message);
  if (error.stack) logger.debug(error.stack);
}

db = admin.firestore();
auth = admin.auth();

export { db, auth };
export default admin;
