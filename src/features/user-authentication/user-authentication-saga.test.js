import { handleFetchQuestions } from 'features/question/questions-saga';
import { call, put } from 'redux-saga/effects';
import { describe } from 'riteway';
import { loginRequest, logoutRequest } from 'utils/firebase-requests';
import request from 'utils/request';

import { loggedIn } from './user-authentication-reducer';
import { handleLogin, handleLogout, login } from './user-authentication-saga';

describe('handleLogin saga', async assert => {
  const didToken = 'did-token';
  const token = 'token';

  const userId = 'userId';
  const email = 'email@email.de';

  const action = login({ didToken });

  const response = { user: { email, uid: userId } };
  const gen = handleLogin(action);

  assert({
    given: 'saga started',
    should: 'return a login request',
    actual: gen.next().value,
    expected: call(request, { route: 'api/login', token: didToken }),
  });

  assert({
    given: 'a token',
    should: 'make a login request',
    actual: gen.next({ token }).value,
    expected: call(loginRequest, token),
  });

  assert({
    given: 'a login request',
    should: 'dispatch a logged in request',
    actual: gen.next(response).value,
    expected: put(loggedIn({ token, email, userId })),
  });

  assert({
    given: 'nothing',
    should: 'fetch the questions',
    actual: gen.next().value,
    expected: call(handleFetchQuestions),
  });

  assert({
    given: 'nothing',
    should: 'be done',
    actual: gen.next().done,
    expected: true,
  });
});

describe('handleLogout saga', async assert => {
  const gen = handleLogout();

  assert({
    given: 'saga started',
    should: 'make a logout request',
    actual: gen.next().value,
    expected: call(logoutRequest),
  });

  assert({
    given: 'nothing',
    should: 'be done',
    actual: gen.next().done,
    expected: true,
  });
});
