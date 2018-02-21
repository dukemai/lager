// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import app from './app';
import user from './user';

const rootReducer = combineReducers({
  app,
  router,
  user,
});

export default rootReducer;
