import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger, logger } from 'redux-logger';

import DevTools from '../components/shared/DevTools';
import combinedReducers  from '../reducers/progress';


const loggerMiddleware = createLogger();

const enhancer = compose(
  applyMiddleware(logger),
  DevTools.instrument(),
);

export default function configureStore(initialState) {
  const store = createStore(combinedReducers, initialState, enhancer);

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept('../reducers/progress', () =>
      store.replaceReducer(combinedReducers),
    );
  }

  return store;
}