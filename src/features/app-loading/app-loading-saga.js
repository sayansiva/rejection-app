import { handleFetchQuestions } from 'features/question/questions-saga';
import { loggedIn } from 'features/user-authentication/user-authentication-reducer';
import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';

import { finishAppLoading, startAppLoading } from './app-loading-reducer';

function* handleStartAppLoading() {
  const { user } = yield call(request, { route: '/api/user' });
  if (!user) {
    yield put(finishAppLoading());
    return;
  }
  yield put(
    loggedIn({ email: user.email, token: user.token, userId: user.uid }),
  );
  yield call(handleFetchQuestions);
  yield put(finishAppLoading());
}

function* watchStartAppLoading() {
  yield takeEvery(startAppLoading.type, handleStartAppLoading);
}
export { handleStartAppLoading, watchStartAppLoading };
