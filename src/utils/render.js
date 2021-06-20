import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from 'redux/root-reducer';
import renderRITEway from 'riteway/render-component.js';

const render = Component => {
  return renderRITEway(
    <Provider store={configureStore({ reducer: rootReducer })}>
      {Component}
    </Provider>,
  );
};

export { render };
