import { UserAuthentication } from 'features/user-authentication/user-authentication-container';
import { isUserLoggedIn } from 'features/user-authentication/user-authentication-reducer';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadApp } from 'features/app-loading/app-loading-saga';

const withAuth = Component => props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadApp());
  }, []);
  //TODO: create a selector to see if user is logged in
  const loggedIn = useSelector(isUserLoggedIn);

  return loggedIn ? <Component {...props} /> : <UserAuthentication />;
};

export { withAuth };
