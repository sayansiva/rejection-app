import admin from 'firebase-admin';

const clientCredentials = {
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

const initializeFirebase = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(clientCredentials),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }
  return admin;
};

export { initializeFirebase };
