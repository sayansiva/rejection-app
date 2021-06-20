import { watchLogin } from 'features/user-authentication/user-authentication-saga';
import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([watchLogin()]);
}

export { rootSaga };
