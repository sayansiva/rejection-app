import { call, put, takeEvery } from '@redux-saga/core/effects';
import {
  createQuestionRequest,
  fetchQuestionsRequest,
} from 'features/question/firebase-requests';
import { getUserId } from 'features/user-authentication/user-authentication-reducer';
import { select } from 'redux-saga/effects';

import { addQuestion, fetchedQuestions } from './questions-reducer';

function* handleFetchQuestions() {
  const userId = yield select(getUserId);
  const result = yield call(fetchQuestionsRequest, userId);
  yield put(fetchedQuestions(result));
}

function* handleCreateQuestion({ payload }) {
  const userId = yield select(getUserId);
  yield call(createQuestionRequest, { payload, userId });
  yield put(addQuestion(payload));
}

const createQuestion = payload => ({ type: createQuestion.type, payload });
createQuestion.type = 'QUESTIONS/createQuestion';

const fetchQuestions = payload => ({ type: fetchQuestions.type, payload });
fetchQuestions.type = 'QUESTIONS/fetchQuestions';

function* watchCreateQuestion() {
  yield takeEvery(createQuestion.type, handleCreateQuestion);
}
function* watchFetchQuestions() {
  yield takeEvery(fetchQuestions.type, handleFetchQuestions);
}

export {
  createQuestion,
  fetchQuestions,
  handleCreateQuestion,
  handleFetchQuestions,
  watchCreateQuestion,
  watchFetchQuestions,
};
