import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { PERSIST, REHYDRATE } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import shouldLogAction from 'utils/should-log-action.js';

import { rootReducer, rootState } from './root-reducer.js';
import { rootSaga } from './root-saga.js';

/**
 * Constants
 */

const enableActionLogging =
  process.env.NEXT_PUBLIC_LOG_REDUX_ACTIONS === 'true';
const isClient = typeof window !== 'undefined';
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

/**
 * Default middleware
 */

const middleware = getDefaultMiddleware({
  thunk: false,
  serializableCheck: {
    // Redux persist uses `register` and `rehydrate` functions as payload.
    ignoredActions: [PERSIST, REHYDRATE],
  },
});

/**
 * Setup Redux logger
 */

const ignoredActions = [];

// Persist and Rehydrate safely time out on the server side and this
// suppresses the warnings.
const serverIgnoredActions = [...ignoredActions, PERSIST, REHYDRATE];

if ((isDev && enableActionLogging) || isProd) {
  const { createLogger } = require(`redux-logger`);

  const logger = createLogger({
    predicate: (_, { type }) =>
      isClient
        ? shouldLogAction(ignoredActions, type)
        : shouldLogAction(serverIgnoredActions, type),
  });

  middleware.push(logger);
}

/**
 * Setup store
 */

let store;

function initStore(preloadedState = rootState) {
  const sagaMiddleware = createSagaMiddleware();
  const _store = configureStore({
    devTools: !isProd,
    preloadedState,
    reducer: rootReducer,
    middleware: [...middleware, sagaMiddleware],
  });

  // Avoid memory leaks, lel.
  if (isClient) {
    sagaMiddleware.run(rootSaga);
  }

  return _store;
}

const initializeStore = preloadedState => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  // This check needs to run in the functions scope.
  if (typeof window === 'undefined') return _store;

  if (!store) store = _store;

  return _store;
};

function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

export { useStore };
