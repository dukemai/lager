/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';

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
        <Route />
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
