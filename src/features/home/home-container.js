import {
  getAcceptedPoints,
  getQuestionsWithPoints,
  getRejectedPoints,
  getTotalPoints,
} from 'features/question/question-reducer';
import { connect } from 'react-redux';

import { Home as HomeComponent } from './home-component';

const mapStateToProps = state => ({
  rejectedPoints: getRejectedPoints(state),
  acceptedPoints: getAcceptedPoints(state),
  totalPoints: getTotalPoints(state),
  questions: getQuestionsWithPoints(state),
});

const Home = connect(mapStateToProps)(HomeComponent);

export { Home };
