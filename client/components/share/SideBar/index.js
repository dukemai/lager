import React from 'react';
import PropTypes from 'prop-types';

import { Menu, Icon, Image, Header } from 'semantic-ui-react';

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
        <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick}>
          <Icon name="list ul" />
          Export
        </Menu.Item>
        <Menu.Item name="messages" active={activeItem === 'messages'} onClick={this.handleItemClick}>
          <Icon name="truck" />
          Import
        </Menu.Item>
        <Menu.Item name="friends" active={activeItem === 'friends'} onClick={this.handleItemClick}>
          <Icon name="archive" />
          Inspect
        </Menu.Item>
        <Menu.Item name="friends" active={activeItem === 'friends'} onClick={this.handleItemClick}>
          <Icon name="address book outline" />
          Contacts
        </Menu.Item>
        <Menu.Item>
          <Icon name="user circle" />
          Duc Mai
        </Menu.Item>
        <Menu.Item name="logout" active={activeItem === 'logout'} onClick={this.handleItemClick}>
          <Icon name="log out" />
          Logout
        </Menu.Item>
      </Menu>
    );
  }
}
