/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';

import { Login, Register, Export, Import, Inspect, Profile, Contacts, ProductInStock } from './components';
import { AuthenticatedRoute } from './components/share';

import { authenticate } from './actions';

const propTypes = {
  onComponentwillMount: PropTypes.func,
};

const defaultProps = {
  onComponentwillMount: () => {},
};

class Routes extends React.Component {
  componentWillMount() {
    this.props.onComponentwillMount();
  }
  componentWillReceiveProps(nextProps) {
  }
  render() {
    return (
      <Switch>
        <AuthenticatedRoute exact path="/" component={Export} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <AuthenticatedRoute exact path="/import" component={Import} />
        <AuthenticatedRoute exact path="/profile" component={Profile} />
        <AuthenticatedRoute exact path="/contacts" component={Contacts} />
        <AuthenticatedRoute exact path="/inspect/new-product" component={ProductInStock} />
        <AuthenticatedRoute exact path="/inspect/:inspect?" component={Inspect} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  onComponentwillMount: () => {
    dispatch(authenticate());
  },
});

Routes.propTypes = propTypes;
Routes.defaultProps = defaultProps;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
