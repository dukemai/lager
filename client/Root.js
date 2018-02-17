import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { PersistGate } from 'redux-persist/integration/react';
import Routes from './Routes';

import './styles.styl';

const propTypes = {
  store: PropTypes.shape({}),
  persistor: PropTypes.shape({}),
  history: PropTypes.shape({}),
};

const defaultProps = {
  store: null,
  persistor: {},
  history: null,
};

const Root = ({ store, persistor, history }) => (
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
    >
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;

export default Root;
