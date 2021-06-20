import { takeEvery } from 'redux-saga/effects';

const login = ({ didToken }) => ({ type: login.type, payload: { didToken } });
login.type = 'USER_AUTH/login';

function* handleLogin({ payload: { didToken } }) {
  console.log('logged in', didToken);
}

function* watchLogin() {
  yield takeEvery(login.type, handleLogin);
}

export { login, watchLogin };
