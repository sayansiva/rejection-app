import { createSlice } from '@reduxjs/toolkit';

const slice = 'app-loading';

const initialState = {
  isAppLoading: false,
};

export const {
  actions: { startAppLoading, finishAppLoading },
  reducer,
} = createSlice({
  initialState,
  name: slice,
  reducers: {
    startAppLoading: state => ({
      ...state,
      isAppLoading: true,
    }),
    finishAppLoading: state => ({ ...state, isAppLoading: false }),
  },
});

const getIsAppLoading = state => state[slice].isAppLoading;

export { getIsAppLoading, slice };
