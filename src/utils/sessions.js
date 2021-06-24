import Iron from '@hapi/iron';

import { asyncPipe } from './async-pipe';
import { getTokenCookie } from './cookies';

const TOKEN_SECRET = process.env.TOKEN_SECRET || '';

const encryptSession = session =>
  Iron.seal(session, TOKEN_SECRET, Iron.defaults);

const seal = token => token && Iron.unseal(token, TOKEN_SECRET, Iron.defaults);

const getSession = asyncPipe(getTokenCookie, seal);

export { encryptSession, getSession };
