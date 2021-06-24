import { cloneableGenerator } from '@redux-saga/testing-utils';
import { call, put } from 'redux-saga/effects';
import { describe } from 'riteway';

import { handleLoadApp } from './app-loading-saga.js';
import request from 'utils/request.js';
import { loggedIn } from 'features/user-authentication/user-authentication-reducer.js';

describe('handleLoadApp saga', async assert => {
  const gen = cloneableGenerator(handleLoadApp)();
  const user = { email: 'email@email.de', token: 'token', userId: 'userId' };

  assert({
    given: 'saga started',
    should: 'make a get user request',
    actual: gen.next().value,
    expected: call(request, { route: '/api/user' }),
  });

  assert({
    given: 'a user',
    should: 'set the user',
    actual: gen.next({ user }).value,
    expected: put(loggedIn(user)),
  });

  assert({
    given: 'nothing',
    should: 'be done',
    actual: gen.next().done,
    expected: true,
  });
});
