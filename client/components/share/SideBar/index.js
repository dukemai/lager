import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Menu, Icon, Image, Dimmer, Loader } from 'semantic-ui-react';

import SideBarItem from './SideBarItem';
import './styles.styl';

const propTypes = {
  isAuthenticating: PropTypes.bool,
  profile: PropTypes.shape({}),
};
const defaultProps = {
  isAuthenticating: false,
  profile: {},
};

class SideBar extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { isAuthenticating, profile } = this.props;
    return (
      <Menu inverted className="sideBar--main" icon="labeled" vertical>
        <Menu.Item>
          <Image className="sideBar__logo" src="https://react.semantic-ui.com/logo.png" />
        </Menu.Item>
        <SideBarItem icon="list ul" name="Export" path="/" />
        <SideBarItem icon="truck" name="Import" path="/import" />
        <SideBarItem icon="archive" name="Inspect" path="/inspect" />
        <SideBarItem icon="address book outline" name="Contacts" path="/contacts" />
        <SideBarItem
          icon="user circle"
          name={profile ? `${profile.firstName} ${profile.lastName}` : ''}
          path="/profile"
          isLoading={isAuthenticating}
        />
        <Menu.Item name="logout" onClick={this.handleItemClick}>
          <Icon name="log out" />
          <Dimmer active={isAuthenticating}>
            <Loader active={isAuthenticating} />
          </Dimmer>
          Logout
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticating: state.user.isAuthenticating,
  profile: state.user.data,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
