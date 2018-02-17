// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import persistConfig from './persistConfig';

import rootReducer from '../reducers';

const history = createHistory();
const router = routerMiddleware(history);
// Logging Middleware
const logger = createLogger({
  level: 'info',
  collapsed: true,
});
const enhancers = [
  applyMiddleware(thunk, router, logger),
];
const enhancer = compose(...enhancers);

function configureStore(initialState) {
  const persistedReducer = persistReducer({ ...persistConfig, key: 'secure' }, rootReducer);

  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store, () => {
    console.log('persist redux loaded.');
  });
  return {
    store,
    persistor,
  };
}

export { configureStore, history };
