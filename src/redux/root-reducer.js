import { combineReducers } from '@reduxjs/toolkit';
import {
  reducer as appLoadingReducer,
  slice as appLoadingSlice,
} from 'features/app-loading/app-loading-reducer';
import {
  reducer as questionsReducer,
  slice as questionsSlice,
} from 'features/question/questions-reducer';
import {
  reducer as userAuthenticationReducer,
  slice as userAuthenticationSlice,
} from 'features/user-authentication/user-authentication-reducer';

const rootReducer = combineReducers({
  [questionsSlice]: questionsReducer,
  [userAuthenticationSlice]: userAuthenticationReducer,
  [appLoadingSlice]: appLoadingReducer,
});

const rootState = rootReducer(undefined, {});

export { rootReducer, rootState };
