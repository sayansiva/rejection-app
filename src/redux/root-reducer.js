import { combineReducers } from '@reduxjs/toolkit';
import {
  reducer as questionReducer,
  slice as questionSlice,
} from 'features/question/question-reducer';

const rootReducer = combineReducers({
  [questionSlice]: questionReducer,
});

const rootState = rootReducer(undefined, {});

export { rootReducer, rootState };
