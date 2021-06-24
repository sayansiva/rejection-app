import {
  watchLoadApp,
  watchStartAppLoading,
} from 'features/app-loading/app-loading-saga';
import {
  watchCreateQuestion,
  watchFetchQuestions,
} from 'features/question/questions-saga';
import {
  watchLogin,
  watchLogout,
} from 'features/user-authentication/user-authentication-saga';
import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([
    watchStartAppLoading(),
    watchLogin(),
    watchFetchQuestions(),
    watchCreateQuestion(),
    watchLogout(),
  ]);
}

export { rootSaga };
