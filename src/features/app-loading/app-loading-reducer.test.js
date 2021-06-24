import { rootReducer } from 'redux/root-reducer';
import { describe } from 'riteway';

import {
  finishAppLoading,
  getIsAppLoading,
  reducer,
  startAppLoading,
} from './app-loading-reducer';
const createState = ({ isAppLoading = false } = {}) => ({ isAppLoading });

describe('app-loading reducer', async assert => {
  assert({
    given: 'no state',
    should: 'return the valid initial state',
    actual: reducer(undefined, {}),
    expected: createState(),
  });

  /**
   * Actions
   */

  assert({
    given: 'no state and a start loading action',
    should: 'set isAppLoading to true',
    actual: reducer(undefined, startAppLoading()),
    expected: createState({ isAppLoading: true }),
  });

  {
    const state = createState({ isAppLoading: true });

    assert({
      given: 'state and a start loading action',
      should: 'keep isAppLoading true',
      actual: reducer(state, startAppLoading()),
      expected: state,
    });
  }

  assert({
    given: 'no state and a finishLoading action',
    should: 'keep isAppLoading true',
    actual: reducer(undefined, finishAppLoading()),
    expected: createState(),
  });

  {
    const state = reducer(undefined, startAppLoading());

    assert({
      given: 'state and a finish loading action',
      should: 'set isAppLoading to false',
      actual: reducer(state, finishAppLoading),
      expected: createState({ isAppLoading: false }),
    });
  }

  /**
   * Selectors
   */

  assert({
    given: 'no state and a get is app loading selector',
    should: 'return false',
    actual: getIsAppLoading(rootReducer(undefined, {})),
    expected: false,
  });

  {
    const state = rootReducer(undefined, startAppLoading());
    assert({
      given: 'state and a get is app loading selector',
      should: 'return true',
      actual: getIsAppLoading(state),
      expected: true,
    });
  }
});
