import { parse, serialize } from 'cookie';
import { pipe } from 'ramda';

const TOKEN_NAME = 'magic-auth-token';
const MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const createCookie = token =>
  serialize(TOKEN_NAME, token, {
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    maxAge: MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

const setHeader = response => cookie =>
  response.setHeader('Set-Cookie', cookie);

const setTokenCookie = response => pipe(createCookie, setHeader(response));

function removeTokenCookie(response) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  });

  response.setHeader('Set-Cookie', cookie);
}

function parseCookies(request) {
  if (request.cookies) {
    return request.cookies;
  }

  const cookie = request.headers?.cookie;
  return parse(cookie || '');
}

function getTokenCookie(request) {
  const cookies = parseCookies(request);
  return cookies[TOKEN_NAME];
}

export { getTokenCookie, removeTokenCookie, setTokenCookie };
