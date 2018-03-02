import React from 'react';
import PropTypes from 'prop-types';

import { Menu, Grid, Header, Sticky } from 'semantic-ui-react';

import { AuthenticatedLayout } from '../share';
import Right from './Right';
import ProductTable from './ProductTable';

import './styles.styl';

const propTypes = {

};
const defaultProps = {

};

class Inspect extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = {
  }

  render() {
    return (
      <AuthenticatedLayout>
        <Grid padded>
          <Grid.Row>
            <Grid.Column textAlign="left" width="12">
              <Header textAlign="left" as="h2">
                Stock
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="left" width="12">
              <Menu secondary pointing>
                <Menu.Item name="Products" active onClick={this.handleItemClick} />
                <Menu.Item name="Distributors" onClick={this.handleItemClick} />
                <Menu.Item name="Manufacturers" onClick={this.handleItemClick} />
                <Menu.Item name="Categories" onClick={this.handleItemClick} />
                <Menu.Item name="Units" onClick={this.handleItemClick} />
              </Menu>
              <ProductTable />
            </Grid.Column>
            <Grid.Column width="4">
              <Sticky>
                <Right />
              </Sticky>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AuthenticatedLayout>
    );
  }
}

Inspect.propTypes = propTypes;
Inspect.defaultProps = defaultProps;

export default Inspect;
