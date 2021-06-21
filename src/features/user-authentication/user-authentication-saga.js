import { handleFetchQuestions } from 'features/question/questions-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { loginRequest, logoutRequest } from 'utils/firebase-requests';
import request from 'utils/request';

import { loggedIn, logout } from './user-authentication-reducer';

const login = ({ didToken }) => ({ type: login.type, payload: { didToken } });
login.type = 'USER_AUTH/login';

function* handleLogin({ payload: { didToken } }) {
  const { token } = yield call(request, {
    route: 'api/login',
    token: didToken,
  });

  const {
    user: { email, uid },
  } = yield call(loginRequest, token);

  yield put(loggedIn({ token, email, userId: uid }));
  yield call(handleFetchQuestions);
}

function* handleLogout() {
  yield call(logoutRequest);
}

function* watchLogout() {
  yield takeEvery(logout.type, handleLogout);
}
function* watchLogin() {
  yield takeEvery(login.type, handleLogin);
}

export { handleLogin, handleLogout, login, watchLogin, watchLogout };
