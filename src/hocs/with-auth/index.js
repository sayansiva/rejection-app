import { UserAuthentication } from 'features/user-authentication/user-authentication-container';
import { isUserLoggedIn } from 'features/user-authentication/user-authentication-reducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const withAuth = Component => props => {
  const loggedIn = useSelector(isUserLoggedIn);

  return loggedIn ? <Component {...props} /> : <UserAuthentication />;
};

export { withAuth };
