/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';

import { Login } from './components';
import { Layout } from './components/share';


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
      <Layout>
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      </Layout>
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
