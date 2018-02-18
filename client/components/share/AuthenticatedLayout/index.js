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
    <Grid
      textAlign="center"
      columns={16}
      className="layout__grid"
      verticalAlign="top"
    >
      <Grid.Row className="layout__row">
        <Grid.Column width={2} className="layout__column">
          <SideBar />
        </Grid.Column>
        <Grid.Column width={14} className="layout__column layout__column--right">
          {children}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Layout>
);

AuthenticatedLayout.propTypes = propTypes;
AuthenticatedLayout.defaultProps = defaultProps;
export default AuthenticatedLayout;
