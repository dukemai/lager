import React, { Component } from 'react';
import { Menu, Button, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class Right extends Component {
  static propTypes = {
    newStockProductClicked: PropTypes.func,
    newStockCompanyClicked: PropTypes.func,
  }
  static defaultProps = {
    newStockCompanyClicked: () => { },
    newStockProductClicked: () => { },
  }
  state = {}
  handleItemClick = (e, { name }) => this.setState({})

  render() {
    const { newStockProductClicked } = this.props;
    return (
      <Menu vertical fluid>

        <Menu.Item name="add" onClick={newStockProductClicked}>
          <Header color="green" as="h4">
            <Icon name="plus" />
            <Header.Content>
              Add product
            </Header.Content>
          </Header>
          <p>Create new product to stock</p>
        </Menu.Item>
        <Menu.Item name="add" onClick={newStockProductClicked}>
          <Header color="teal" as="h4">
            <Icon name="search" />
            <Header.Content>
              Browse manufacturers
            </Header.Content>
          </Header>
          <p>View and edit manufacturers</p>
        </Menu.Item>
        <Menu.Item name="add" onClick={newStockProductClicked}>
          <Header color="teal" as="h4">
            <Icon name="search" />
            <Header.Content>
              Browse distributors
            </Header.Content>
          </Header>
          <p>View and edit distributors</p>
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  newStockProductClicked: () => {
    dispatch(push('/inspect/new-product'));
  },
  newStockCompanyClicked: () => {
    dispatch(push('/inspect/new-company'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Right);
