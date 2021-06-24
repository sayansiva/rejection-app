import { cloneableGenerator } from '@redux-saga/testing-utils';
import { handleFetchQuestions } from 'features/question/questions-saga.js';
import { loggedIn } from 'features/user-authentication/user-authentication-reducer.js';
import { call, put } from 'redux-saga/effects';
import { describe } from 'riteway';
import request from 'utils/request.js';

import { finishAppLoading } from './app-loading-reducer.js';
import { handleStartAppLoading } from './app-loading-saga.js';

describe('handleStartAppLoading saga', async assert => {
  const gen = cloneableGenerator(handleStartAppLoading)();
  const user = { email: 'email@email.de', token: 'token', uid: 'userId' };

  assert({
    given: 'saga started',
    should: 'make a get user request',
    actual: gen.next().value,
    expected: call(request, { route: '/api/user' }),
  });

  {
    const clone = gen.clone();

    assert({
      given: 'no user',
      should: 'finish loading',
      actual: clone.next({ user: null }).value,
      expected: put(finishAppLoading()),
    });

    assert({
      given: 'nothing',
      should: 'be done',
      actual: clone.next().done,
      expected: true,
    });
  }

  assert({
    given: 'a user',
    should: 'set the user',
    actual: gen.next({ user }).value,
    expected: put(
      loggedIn({ email: user.email, token: user.token, userId: user.uid }),
    ),
  });

  assert({
    given: 'nothing',
    should: 'fetch the questions',
    actual: gen.next().value,
    expected: call(handleFetchQuestions),
  });

  assert({
    given: 'nothing',
    should: 'finish the app loading',
    actual: gen.next().value,
    expected: put(finishAppLoading()),
  });

  assert({
    given: 'nothing',
    should: 'be done',
    actual: gen.next().done,
    expected: true,
  });
});
