import { rootReducer } from 'redux/root-reducer';
import { describe } from 'riteway';

import { createQuestion } from './question-factories';
import {
  addQuestion,
  fetchedQuestions,
  getAcceptedPoints,
  getQuestions,
  getQuestionsWithPoints,
  getRejectedPoints,
  getTotalPoints,
  reducer,
} from './question-reducer';

describe('question reducer', async assert => {
  assert({
    given: 'no state',
    should: 'return the valid initial state',
    actual: reducer(undefined, {}),
    expected: [],
  });

  /**
   * Actions
   */
  {
    const question = createQuestion({
      question: 'some question',
      askee: 'Some askee',
    });

    assert({
      given: 'no state and an add question action',
      should: 'add the question',
      actual: reducer(undefined, addQuestion(question)),
      expected: [question],
    });
  }

  {
    const first = createQuestion({ question: 'first', askee: 'askee' });
    const second = createQuestion({ question: 'second', askee: 'askee' });
    const toAdd = createQuestion({ question: 'third', askee: 'askee' });
    const state = [first, second];

    assert({
      given: 'state and an add question action',
      should: 'add the question',
      actual: reducer(state, addQuestion(toAdd)),
      expected: [first, second, toAdd],
    });
  }

  {
    const first = createQuestion({ question: 'first', askee: 'askee' });
    const second = createQuestion({ question: 'second', askee: 'askee' });
    const questions = [first, second];

    assert({
      given: 'no state and an add questions action',
      should: 'add the questions',
      actual: reducer(undefined, fetchedQuestions(questions)),
      expected: questions,
    });
  }

  {
    const first = createQuestion({ question: 'first', askee: 'askee' });
    const second = createQuestion({ question: 'second', askee: 'askee' });
    const third = createQuestion({ question: 'third', askee: 'askee' });
    const fourth = createQuestion({ question: 'fourth', askee: 'askee' });

    const state = [first, second];

    assert({
      given: 'state and a add questions action',
      should: 'add the questions',
      actual: reducer(state, fetchedQuestions([third, fourth])),
      expected: [first, second, third, fourth],
    });
  }

  /**
   * Selectors
   */
  assert({
    given: 'no state and a get questions selector',
    should: 'return an empty array',
    actual: getQuestions(rootReducer(undefined, {})),
    expected: [],
  });

  {
    const first = createQuestion({ question: 'question', askee: 'askee' });
    const second = createQuestion({ question: 'second', askee: 'askee' });

    const questions = [first, second];

    const state = rootReducer(undefined, fetchedQuestions(questions));

    assert({
      given: 'state and a get questions selector',
      should: 'return the questions',
      actual: getQuestions(state),
      expected: questions,
    });
  }

  assert({
    given: 'no state and a get questions with points selector',
    should: 'return an empty array',
    actual: getQuestionsWithPoints(rootReducer(undefined, {})),
    expected: [],
  });

  {
    const first = createQuestion({ status: 'rejected' });
    const second = createQuestion({ status: 'accepted' });
    const state = rootReducer(undefined, fetchedQuestions([first, second]));

    assert({
      given: 'state and a get questions with points selector',
      should: 'return the questions with points',
      actual: getQuestionsWithPoints(state),
      expected: [
        { ...first, points: 10 },
        { ...second, points: 1 },
      ],
    });
  }

  assert({
    given: 'no state and a get total points selector',
    should: 'return the total points',
    actual: getTotalPoints(rootReducer(undefined, {})),
    expected: 0,
  });

  {
    const accepted = createQuestion();
    const rejected = createQuestion({ status: 'rejected' });
    const state = rootReducer(
      undefined,
      fetchedQuestions([accepted, rejected]),
    );
    assert({
      given: 'state and a get total points selector',
      should: 'return the total points',
      actual: getTotalPoints(state),
      expected: 11,
    });
  }

  assert({
    given: 'no state and a get accepted points selector',
    should: 'return the accepted points',
    actual: getAcceptedPoints(rootReducer(undefined, {})),
    expected: 0,
  });

  {
    const accepted = createQuestion();
    const rejected = createQuestion({ status: 'rejected' });
    const state = rootReducer(
      undefined,
      fetchedQuestions([accepted, rejected]),
    );

    assert({
      given: 'state and a get accepted points selector',
      should: 'return the accepted points',
      actual: getAcceptedPoints(state),
      expected: 1,
    });
  }

  assert({
    given: 'no state and a get rejected points selector',
    should: 'return the rejected points',
    actual: getRejectedPoints(rootReducer(undefined, {})),
    expected: 0,
  });

  {
    const accepted = createQuestion();
    const rejected = createQuestion({ status: 'rejected' });
    const state = rootReducer(
      undefined,
      fetchedQuestions([accepted, rejected]),
    );

    assert({
      given: 'state and a get rejected points selector',
      should: 'return the rejected points',
      actual: getRejectedPoints(state),
      expected: 10,
    });
  }
});
