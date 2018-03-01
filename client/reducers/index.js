// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import app from './app';
import user from './user';
import addProductToStock, { addProductEpic } from './addProductToStock';

const rootEpic = combineEpics(addProductEpic);

const epicMiddleware = createEpicMiddleware(rootEpic);
const rootReducer = combineReducers({
  app,
  router,
  user,
  addProductToStock,
});

export default rootReducer;
export { epicMiddleware };
