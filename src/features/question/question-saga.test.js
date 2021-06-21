import { getUserId } from 'features/user-authentication/user-authentication-reducer';
import { call, put, select } from 'redux-saga/effects';
import { describe } from 'riteway';

import {
  createQuestionRequest,
  fetchQuestionsRequest,
} from './firebase-requests';
import { createQuestion as createQuestionFactory } from './question-factories';
import { addQuestion, fetchedQuestions } from './questions-reducer';
import {
  createQuestion,
  handleCreateQuestion,
  handleFetchQuestions,
} from './questions-saga';

describe('handleFetchQuestions saga', async assert => {
  const gen = handleFetchQuestions();
  const userId = 'userId';
  const question = createQuestionFactory({
    askee: 'some askee',
    question: 'some question',
  });
  const response = [question];

  assert({
    given: 'saga started',
    should: 'select the userId',
    actual: gen.next().value,
    expected: select(getUserId),
  });

  assert({
    given: 'the user id',
    should: 'make a fetch questions request',
    actual: gen.next(userId).value,
    expected: call(fetchQuestionsRequest, userId),
  });

  assert({
    given: 'a questions response',
    should: 'dispatch the fetch questions action',
    actual: gen.next(response).value,
    expected: put(fetchedQuestions(response)),
  });

  assert({
    given: 'nothing',
    should: 'be done',
    actual: gen.next().done,
    expected: true,
  });
});

describe('handleCreateQuestion saga', async assert => {
  const question = createQuestionFactory({
    askee: 'some askee',
    question: 'some question',
  });
  const userId = 'userId';

  const action = createQuestion(question);
  const gen = handleCreateQuestion(action);

  assert({
    given: 'saga started',
    should: 'select the user id',
    actual: gen.next().value,
    expected: select(getUserId),
  });

  assert({
    given: 'a user id',
    should: 'return a create question request',
    actual: gen.next(userId).value,
    expected: call(createQuestionRequest, { userId, payload: question }),
  });

  assert({
    given: 'nothing',
    should: 'add the question',
    actual: gen.next().value,
    expected: put(addQuestion(question)),
  });

  assert({
    given: 'nothing',
    should: 'be done',
    actual: gen.next().done,
    expected: true,
  });
});
