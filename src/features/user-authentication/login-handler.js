//TODO: use async pipes
import { initializeFirebase } from 'lib/firebase';
import magic from 'utils/magic';
import { encryptSession } from 'utils/sessions';
import { setTokenCookie } from 'utils/cookies';

const loginHandler = async (request, response) => {
  if (request.method === 'GET') {
    const authHeaders = request.headers.authorization;

    if (authHeaders) {
      const admin = initializeFirebase();

      const didToken = magic.utils.parseAuthorizationHeader(authHeaders);
      const session = await magic.users.getMetadataByToken(didToken);

      const { email } = session;
      const token = await encryptSession(session);
      setTokenCookie(response)(token);

      try {
        const user = (await admin.auth().getUserByEmail(email)).toJSON();
        const claim = magic.token.decode(didToken)[1];
        console.log('user', user);
        console.log('claim', claim);

        const { status, json } = await handleExistingUser(user, claim);
        console.log('status', status);
        console.log('json', json);
        return response.status(status).json(json);
      } catch (e) {
        console.log('no user', e);
        const { status, json } = await handleNewUser(email);
        console.log('statuss', status);
        console.log('json', json);
        return response.status(status).json(json);
      }
    }

    return response.status(400).json({ message: 'No token found in request.' });
  }
};

const handleExistingUser = async (user, claim) => {
  const admin = initializeFirebase();

  /* Check for replay attack (https://go.magic.link/replay-attack) */
  const lastSignInTime = Date.parse(user.metadata.lastSignInTime) / 1000;
  const tokenIssuedTime = claim.iat;
  if (tokenIssuedTime <= lastSignInTime) {
    return { status: 400, json: { message: 'This DID token is invalid.' } };
  }
  const firebaseToken = await admin.auth().createCustomToken(user.uid);
  return {
    status: 200,
    json: {
      uid: user.uid,
      token: firebaseToken,
    },
  };
};

const handleNewUser = async email => {
  const admin = initializeFirebase();

  const newUser = await admin.auth().createUser({
    email: email,
    emailVerified: true,
  });
  const firebaseToken = await admin.auth().createCustomToken(newUser.uid);
  return {
    status: 200,
    json: {
      uid: newUser.uid,
      token: firebaseToken,
    },
  };
};

export default loginHandler;
