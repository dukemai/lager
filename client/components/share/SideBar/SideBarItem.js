import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Menu, Icon } from 'semantic-ui-react';

const propTypes = {
  path: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};
const defaultProps = {
  path: '',
  name: '',
  icon: '',
  onClick: () => { },
  isActive: false,
};

const SideBarItem = ({
  path, name, icon, onClick, isActive,
}) =>
  (
    <Menu.Item name={name} active={isActive} onClick={onClick}>
      <Icon name={icon} />
      {name}
    </Menu.Item>
  );

SideBarItem.propTypes = propTypes;
SideBarItem.defaultProps = defaultProps;

const mapStateToProps = (state, ownProps) => ({
  isActive: state.router.location.pathname === ownProps.path,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(push(ownProps.path));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBarItem);
