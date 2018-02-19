/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';

import { Login, Register, Export, Import, Inspect } from './components';

const propTypes = {
};

const defaultProps = {

};

class Routes extends React.Component {
  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {
  }
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/import" component={Import} />
        <Route exact path="/export" component={Export} />
        <Route exact path="/inspect" component={Inspect} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({

});

Routes.propTypes = propTypes;
Routes.defaultProps = defaultProps;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
