import { logout } from 'features/user-authentication/user-authentication-reducer';
import { describe } from 'riteway';

// the action creator IS a question factory - do we need this?
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
  slice,
} from './questions-reducer';

const withSlice = state => ({ [slice]: state });
const initialState = reducer(undefined, {});

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
    const state = reducer(initialState, addQuestion(question));

    // Action creators and selectors are the public API for the reducer,
    // and you should only be testing the public API.
    assert({
      given: 'initial state and an add question action',
      should: 'add the question',
      actual: getQuestions(withSlice(state)),
      // Your unit tests should not know the state shape, so use selectors.
      expected: [question],
    });
  }

  {
    const actions = [
      addQuestion({ question: 'first', askee: 'askee' }),
      addQuestion({ question: 'second', askee: 'askee' }),
      addQuestion({ question: 'third', askee: 'askee' }),
    ];
    const state = withSlice(actions.reduce(reducer, initialState));

    assert({
      given: 'state and an add question action',
      should: 'add the question',
      actual: getQuestions(state),
      expected: actions.map(({ payload }) => payload),
    });
  }

  {
    const actions = [
      addQuestion({ question: 'first', askee: 'askee' }),
      addQuestion({ question: 'second', askee: 'askee' }),
      addQuestion({ question: 'third', askee: 'askee' }),
    ];
    const state = withSlice(actions.reduce(reducer, initialState));

    assert({
      given: 'state and an add question action',
      should: 'add the question',
      actual: getQuestions(state),
      expected: actions.map(({ payload }) => payload),
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

  assert({
    given: 'no state and a logout action',
    should: 'reset the state',
    actual: reducer(undefined, logout()),
    expected: [],
  });

  {
    const first = createQuestion({ question: 'first', askee: 'askee' });
    const second = createQuestion({ question: 'second', askee: 'askee' });

    const state = reducer(undefined, fetchedQuestions([first, second]));

    assert({
      given: 'state and a logout action',
      should: 'reset the state',
      actual: reducer(state, logout()),
      expected: [],
    });
  }

  /**
   * Selectors
   */
  assert({
    given: 'no state and a get questions selector',
    should: 'return an empty array',
    actual: getQuestions(withSlice(reducer(undefined, {}))),
    expected: [],
  });

  {
    const first = createQuestion({ question: 'question', askee: 'askee' });
    const second = createQuestion({ question: 'second', askee: 'askee' });

    const questions = [first, second];

    const state = withSlice(reducer(undefined, fetchedQuestions(questions)));

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
    actual: getQuestionsWithPoints(withSlice(reducer(undefined, {}))),
    expected: [],
  });

  {
    const first = createQuestion({ status: 'rejected' });
    const second = createQuestion({ status: 'accepted' });
    const state = withSlice(
      reducer(undefined, fetchedQuestions([first, second])),
    );

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
    actual: getTotalPoints(withSlice(reducer(undefined, {}))),
    expected: 0,
  });

  {
    const accepted = createQuestion();
    const rejected = createQuestion({ status: 'rejected' });
    const state = withSlice(
      reducer(undefined, fetchedQuestions([accepted, rejected])),
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
    actual: getAcceptedPoints(withSlice(reducer(undefined, {}))),
    expected: 0,
  });

  {
    const accepted = createQuestion();
    const rejected = createQuestion({ status: 'rejected' });
    const state = withSlice(
      reducer(undefined, fetchedQuestions([accepted, rejected])),
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
    actual: getRejectedPoints(withSlice(reducer(undefined, {}))),
    expected: 0,
  });

  {
    const accepted = createQuestion();
    const rejected = createQuestion({ status: 'rejected' });
    const state = withSlice(
      reducer(undefined, fetchedQuestions([accepted, rejected])),
    );

    assert({
      given: 'state and a get rejected points selector',
      should: 'return the rejected points',
      actual: getRejectedPoints(state),
      expected: 10,
    });
  }
});
