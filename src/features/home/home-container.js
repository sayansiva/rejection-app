import {
  getAcceptedPoints,
  getQuestionsWithPoints,
  getRejectedPoints,
  getTotalPoints,
} from 'features/question/questions-reducer';
import { logout } from 'features/user-authentication/user-authentication-reducer';
import { connect } from 'react-redux';

import { Home as HomeComponent } from './home-component';

const mapStateToProps = state => ({
  rejectedPoints: getRejectedPoints(state),
  acceptedPoints: getAcceptedPoints(state),
  totalPoints: getTotalPoints(state),
  questions: getQuestionsWithPoints(state),
});

const Home = connect(mapStateToProps, { onClickLogout: () => logout() })(
  HomeComponent,
);

export { Home };
