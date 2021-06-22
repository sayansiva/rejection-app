import { createSlice } from '@reduxjs/toolkit';
import { isEmpty, not, path, pipe } from 'ramda';

const slice = 'user-authentication';

const initialState = {
  token: '',
  userId: '',
  email: '',
  isLoggingIn: false,
};

export const {
  actions: { loggedIn, login, logout },
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
    login: state => ({ ...state, isLoggingIn: true }),
    logout: () => initialState,
  },
});

const getToken = path([slice, 'token']);
const getUserId = path([slice, 'userId']);
const getEmail = path([slice, 'email']);

const getIsLoggingIn = path([slice, 'isLoggingIn']);

const isUserLoggedIn = pipe(getToken, isEmpty, not);

export { getEmail, getIsLoggingIn, getToken, getUserId, isUserLoggedIn, slice };
