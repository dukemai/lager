import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

const propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string,
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};
const defaultProps = {
  exact: false,
  path: '',
  component: () => { },
  isAuthenticated: false,
};

const AuthenticatedRoute = ({
  isAuthenticated, exact, path, component,
}) => (
  <Route
    exact={exact}
    path={path}
    render={() => (
      !isAuthenticated ? (
        <Redirect to="/login" />
      ) :
        React.createElement(component)
    )}
  />
);

AuthenticatedRoute.propTypes = propTypes;
AuthenticatedRoute.defaultProps = defaultProps;

const mapStateToProps = state => ({
  isAuthenticated: Boolean(state.app.token),
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute);
