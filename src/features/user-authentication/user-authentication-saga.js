import { handleFetchQuestions } from 'features/question/questions-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { loginRequest, logoutRequest } from 'utils/firebase-requests';
import request from 'utils/request';

import { loggedIn, login, logout } from './user-authentication-reducer';

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

export { handleLogin, handleLogout, watchLogin, watchLogout };
