import request from 'utils/request';
import { call, put } from 'redux-saga/effects';
import { loggedIn } from 'features/user-authentication/user-authentication-reducer';

function* handleLoadApp() {
  const { user } = yield call(request, { route: '/api/user' });
  yield put(loggedIn(user));
}

const loadApp = () => ({ type: loadApp.type });
loadApp.type = 'APP_LOADING/loadApp';

function* watchLoadApp() {
  yield takeEvery(loadApp.type, handleLoadApp);
}
export { handleLoadApp, watchLoadApp, loadApp };
