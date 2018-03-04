import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Menu, Icon, Loader, Dimmer } from 'semantic-ui-react';

const propTypes = {
  path: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  isLoading: PropTypes.bool,
  isParentMenu: PropTypes.bool,
};
const defaultProps = {
  path: '',
  name: '',
  icon: '',
  onClick: () => { },
  isActive: false,
  isLoading: false,
  isParentMenu: false,
};

const MenuItem = ({
  path, name, icon, onClick, isActive, isLoading
}) =>
  (
    <Menu.Item name={name} active={isActive} onClick={onClick}>
      {icon && (<Icon name={icon} />)}
      <Dimmer active={isLoading}>
        <Loader inverted active={isLoading} />
      </Dimmer>
      {name}
    </Menu.Item>
  );

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

const mapStateToProps = (state, ownProps) => ({
  isActive: state.router.location.pathname === ownProps.path ||
    (ownProps.isParentMenu && state.router.location.pathname.startsWith(ownProps.path)),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(push(ownProps.path));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
