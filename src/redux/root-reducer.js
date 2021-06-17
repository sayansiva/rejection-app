import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const homeReducerConfig = {
  key: 'homeSlice',
  storage,
  whitelist: ['count'],
};

const rootReducer = combineReducers({});

const rootState = rootReducer(undefined, {});

export { rootReducer, rootState };
