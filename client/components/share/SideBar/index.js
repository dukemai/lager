import React from 'react';
import PropTypes from 'prop-types';

import { Menu, Icon, Image } from 'semantic-ui-react';

import SideBarItem from './SideBarItem';
import './styles.styl';

const propTypes = {
};
const defaultProps = {
};

export default class SideBar extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted className="sideBar--main" icon="labeled" vertical>
        <Menu.Item>
          <Image className="sideBar__logo" src="https://react.semantic-ui.com/logo.png" />
        </Menu.Item>
        <SideBarItem icon="list ul" name="Export" path="/" />
        <SideBarItem icon="truck" name="Import" path="/import" />
        <SideBarItem icon="archive" name="Inspect" path="/inspect" />
        <SideBarItem icon="address book outline" name="Contacts" path="/contacts" />
        <SideBarItem icon="user circle" name="Duc Mai" path="/profile" />
        <Menu.Item name="logout" active={activeItem === 'logout'} onClick={this.handleItemClick}>
          <Icon name="log out" />
          Logout
        </Menu.Item>
      </Menu>
    );
  }
}
