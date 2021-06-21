import { UserAuthentication } from 'features/user-authentication/user-authentication-container';
import { isUserLoggedIn } from 'features/user-authentication/user-authentication-reducer';
import { useSelector } from 'react-redux';

const withAuth = Component => props => {
  //TODO: create a selector to see if user is logged in
  const loggedIn = useSelector(isUserLoggedIn);

  return loggedIn ? <Component {...props} /> : <UserAuthentication />;
};

export { withAuth };
