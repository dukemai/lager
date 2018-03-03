import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Table, Checkbox } from 'semantic-ui-react';

import ProductTableRow from './ProductTableRow';

const propTypes = {
};
const defaultProps = {
};

const ProductTable = ({ }) => (
  <Table selectable className="inspectScreen__table" size="small">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Checkbox />
        </Table.HeaderCell>
        <Table.HeaderCell>Product code</Table.HeaderCell>
        <Table.HeaderCell>Product title</Table.HeaderCell>
        <Table.HeaderCell>Category</Table.HeaderCell>
        <Table.HeaderCell>Quantity</Table.HeaderCell>
        <Table.HeaderCell>Unit</Table.HeaderCell>
        <Table.HeaderCell>Import Price</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell>Distributor</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell><Icon name="sidebar" /></Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <ProductTableRow />
      <ProductTableRow />
      <ProductTableRow />
      <ProductTableRow />
      <ProductTableRow />
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="11">
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='left chevron' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='right chevron' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
);

ProductTable.propTypes = propTypes;
ProductTable.defaultProps = defaultProps;
export default ProductTable;
