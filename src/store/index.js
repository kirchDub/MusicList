import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';

import log from '../middleware/log';
import api from '../middleware/api';

import combinedReducers from '../reducers';
import DevTools from '../components/shared/DevTools';

const loggerMiddleware = createLogger();

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    api,
    log
  ),
  DevTools.instrument(),
);

export default function configureStore(initialState) {
  const store = createStore(combinedReducers, initialState, enhancer);

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(combinedReducers),
    );
  }
  window.store = store;
  return store;
}