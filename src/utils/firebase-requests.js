import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const initializeClientApp = () => {
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  }
  return firebase.app();
};

const getEach = snapshot => snapshot.docs.map(doc => doc.data());

const fetchQuestionsRequest = userId => {
  const instance = initializeClientApp();
  return firebase
    .firestore(instance)
    .collection(`app/${userId}/questions`)
    .get()
    .then(getEach);
};

const createQuestionRequest = ({ userId, payload }) => {
  const instance = initializeClientApp();
  return firebase
    .firestore(instance)
    .collection(`app/${userId}/questions`)
    .add(payload);
};

const loginRequest = token => {
  const instance = initializeClientApp();
  return firebase.auth(instance).signInWithCustomToken(token);
};

const logoutRequest = () => {
  const instance = initializeClientApp();
  return firebase.auth(instance).signOut();
};

export {
  createQuestionRequest,
  fetchQuestionsRequest,
  loginRequest,
  logoutRequest,
};
