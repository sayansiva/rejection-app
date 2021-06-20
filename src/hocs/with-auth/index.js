import { UserAuthentication } from 'features/user-authentication/user-authentication-container';
import { useSelector } from 'react-redux';

const withAuth = Component => props => {
  //TODO: create a selector to see if user is logged in
  const loggedIn = useSelector(() => false);

  return loggedIn ? <Component {...props} /> : <UserAuthentication />;
};

export { withAuth };
