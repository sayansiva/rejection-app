import { rootReducer } from 'redux/root-reducer';
import { describe } from 'riteway';

import {
  getEmail,
  getToken,
  getUserId,
  isUserLoggedIn,
  loggedIn,
  logout,
  reducer,
} from './user-authentication-reducer';

const createState = ({ token = '', email = '', userId = '' } = {}) => ({
  token,
  email,
  userId,
});

describe('question reducer', async assert => {
  assert({
    given: 'no state',
    should: 'return the valid initial state',
    actual: reducer(undefined, {}),
    expected: createState(),
  });

  {
    const userId = 'user-id';
    const email = 'email';
    const token = 'token';

    assert({
      given: 'no state and a logged in action',
      should: 'set the token, email and userId',
      actual: reducer(undefined, loggedIn({ token, userId, email })),
      expected: createState({ token, userId, email }),
    });
  }

  {
    const userId = 'user-id';
    const email = 'email';
    const token = 'token';
    const newToken = 'new-token';
    const state = createState({ token });

    assert({
      given: 'state and a logged in action',
      should: 'set the token',
      actual: reducer(state, loggedIn({ token: newToken, email, userId })),
      expected: createState({ token: newToken, userId, email }),
    });
  }

  assert({
    given: 'no state and a logout action',
    should: 'reset the state',
    actual: reducer(undefined, logout()),
    expected: createState(),
  });

  {
    const state = reducer(
      undefined,
      loggedIn({ token: 'token', email: 'email', userId: 'email' }),
    );

    assert({
      given: 'state and a logout action',
      should: 'reset the state',
      actual: reducer(state, logout()),
      expected: createState(),
    });
  }

  assert({
    given: 'no state and a get token selector',
    should: 'return the token',
    actual: getToken(rootReducer(undefined, {})),
    expected: '',
  });

  {
    const token = 'token';
    const state = rootReducer(undefined, loggedIn({ token }));

    assert({
      given: 'no state and a get token selector',
      should: 'return the token',
      actual: getToken(state),
      expected: token,
    });
  }

  assert({
    given: 'no state and a get email selector',
    should: 'return the email',
    actual: getEmail(rootReducer(undefined, {})),
    expected: '',
  });

  {
    const email = 'email';
    const state = rootReducer(undefined, loggedIn({ email }));

    assert({
      given: 'no state and a get token selector',
      should: 'return the token',
      actual: getEmail(state),
      expected: email,
    });
  }

  assert({
    given: 'no state and a get userId selector',
    should: 'return the userId',
    actual: getUserId(rootReducer(undefined, {})),
    expected: '',
  });

  {
    const userId = 'userId';
    const state = rootReducer(undefined, loggedIn({ userId }));

    assert({
      given: 'no state and a get token selector',
      should: 'return the token',
      actual: getUserId(state),
      expected: userId,
    });
  }

  assert({
    given: 'no state and a is user logged in selector',
    should: 'return false',
    actual: isUserLoggedIn(rootReducer(undefined, {})),
    expected: false,
  });

  {
    const token = 'token';
    const state = rootReducer(undefined, loggedIn({ token }));
    assert({
      given: 'a token and a is user logged in selector',
      should: 'return true',
      actual: isUserLoggedIn(rootReducer(state, {})),
      expected: true,
    });
  }
});
