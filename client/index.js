import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { configureStore, history } from './store/configureStore';
import Root from './Root';

const { store, persistor } = configureStore({});
ReactDOM.render(
  <AppContainer>
    <Root store={store} persistor={persistor} history={history} />
  </AppContainer>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextRoot = require('./Root').default; // eslint-disable-line global-require
    console.log(NextRoot);
    ReactDOM.render(
      <AppContainer>
        <NextRoot store={store} persistor={persistor} history={history} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
