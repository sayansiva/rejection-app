import { createSlice } from '@reduxjs/toolkit';
import { filter, map, pipe, reduce } from 'ramda';
import prop from 'ramda/src/prop';

const slice = 'questions';

const initialState = [];

export const {
  actions: { addQuestion, fetchedQuestions },
  reducer,
} = createSlice({
  initialState,
  name: slice,
  reducers: {
    addQuestion: (state, { payload }) => [...state, payload],
    //TODO: fetch the questions from the backend and dispatch this action.
    fetchedQuestions: (state, { payload }) => [...state, ...payload],
  },
});

const pointsMap = {
  accepted: 1,
  rejected: 10,
};

const addPointAttribute = ({ status, ...rest }) => ({
  points: pointsMap[status],
  status,
  ...rest,
});
const sumPointsReducer = (acc, { points }) => acc + points;

const getPoints = pipe(map(addPointAttribute), reduce(sumPointsReducer, 0));

const getQuestions = prop(slice);

const getQuestionsWithPoints = pipe(getQuestions, map(addPointAttribute));

const isAccepted = ({ status }) => status === 'accepted';
const isRejected = ({ status }) => status === 'rejected';

const getTotalPoints = pipe(getQuestions, getPoints);
const getAcceptedPoints = pipe(getQuestions, filter(isAccepted), getPoints);
const getRejectedPoints = pipe(getQuestions, filter(isRejected), getPoints);

export {
  getAcceptedPoints,
  getQuestions,
  getQuestionsWithPoints,
  getRejectedPoints,
  getTotalPoints,
  slice,
};
