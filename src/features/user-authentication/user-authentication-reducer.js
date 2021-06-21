import { createSlice } from '@reduxjs/toolkit';
import { isEmpty, not, path, pipe } from 'ramda';

const slice = 'user-authentication';

const initialState = {
  token: '',
  userId: '',
  email: '',
};

export const {
  actions: { loggedIn, logout },
  reducer,
} = createSlice({
  initialState,
  name: slice,
  reducers: {
    loggedIn: (state, { payload: { token, userId, email } }) => ({
      ...state,
      token,
      userId,
      email,
    }),
    logout: () => initialState,
  },
});

const getToken = path([slice, 'token']);
const getUserId = path([slice, 'userId']);
const getEmail = path([slice, 'email']);

const isUserLoggedIn = pipe(getToken, isEmpty, not);

export { getEmail, getToken, getUserId, isUserLoggedIn, slice };
