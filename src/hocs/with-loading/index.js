import { AppLoading } from 'features/app-loading/app-loading-container';
import {
  getIsAppLoading,
  startAppLoading,
} from 'features/app-loading/app-loading-reducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const withLoading = Component => props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startAppLoading());
  }, [dispatch]);

  const loading = useSelector(getIsAppLoading);
  return loading ? <AppLoading /> : <Component {...props} />;
};

export { withLoading };
