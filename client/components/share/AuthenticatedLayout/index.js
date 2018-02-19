import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { Layout, SideBar } from '../';
import './styles.styl';

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: null,
};

const AuthenticatedLayout = ({ children }) => (
  <Layout>
    <div className="layout__column layout__column--first">
      <SideBar />
    </div>
    <div className="layout__column layout__column--right">
      {children}
    </div>
  </Layout>
);

AuthenticatedLayout.propTypes = propTypes;
AuthenticatedLayout.defaultProps = defaultProps;
export default AuthenticatedLayout;
