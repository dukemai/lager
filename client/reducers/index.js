// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import app from './app';
import user from './user';
import addProductToStock from './addProductToStock';

const rootReducer = combineReducers({
  app,
  router,
  user,
  addProductToStock,
});

export default rootReducer;
