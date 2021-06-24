import { createSlice } from '@reduxjs/toolkit';
import { logout } from 'features/user-authentication/user-authentication-reducer';
import { filter, map, pipe, propOr, reduce } from 'ramda';
import prop from 'ramda/src/prop';

const slice = 'questions';

const initialState = [];

export const {
  actions: { addQuestion, fetchedQuestions },
  reducer,
} = createSlice({
  initialState,
  name: slice,
  extraReducers: builder => {
    builder.addCase(logout.type, () => initialState);
  },
  reducers: {
    addQuestion: (state, { payload }) => [...state, payload],
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
const sumPointsReducer = (totalPoints, { status }) =>
  totalPoints + propOr(0, status, pointsMap);
const getPoints = reduce(sumPointsReducer, 0);

const getQuestions = prop(slice);

const getQuestionsWithPoints = pipe(getQuestions, map(addPointAttribute));

const isAccepted = ({ status }) => status === 'accepted';
const isRejected = ({ status }) => status === 'rejected';

const getTotalPoints = pipe(getQuestionsWithPoints, getPoints);
const getAcceptedPoints = pipe(
  getQuestionsWithPoints,
  filter(isAccepted),
  getPoints,
);
const getRejectedPoints = pipe(
  getQuestionsWithPoints,
  filter(isRejected),
  getPoints,
);

export {
  getAcceptedPoints,
  getQuestions,
  getQuestionsWithPoints,
  getRejectedPoints,
  getTotalPoints,
  slice,
};
