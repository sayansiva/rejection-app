import { asyncPipe } from './async-pipe';

const liftedFetch = ({ body, method = 'GET', route, token }) =>
  fetch(route, {
    ...(method !== 'GET' && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    method,
  });

const toJson = response => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  try {
    return response.json();
  } catch {
    return {
      context: `Nothing parsed in toJson. The response's type was: ${response.type}.`,
    };
  }
};

/**
 * @returns JSON of request if the response is ok, otherwise it throws.
 */
const request = asyncPipe(liftedFetch, toJson);

export default request;
