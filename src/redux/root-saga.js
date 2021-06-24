import {
  watchCreateQuestion,
  watchFetchQuestions,
} from 'features/question/questions-saga';
import {
  watchLogin,
  watchLogout,
} from 'features/user-authentication/user-authentication-saga';
import { all } from 'redux-saga/effects';
import { watchLoadApp } from 'features/app-loading/app-loading-saga';

function* rootSaga() {
  yield all([
    watchLoadApp(),
    watchLogin(),
    watchFetchQuestions(),
    watchCreateQuestion(),
    watchLogout(),
  ]);
}

export { rootSaga };
