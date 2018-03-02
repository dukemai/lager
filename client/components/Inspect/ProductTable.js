import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Table } from 'semantic-ui-react';

const propTypes = {
};
const defaultProps = {
};

const ProductTable = ({ }) => (
  <Table className="inspectScreen__table" celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Product code</Table.HeaderCell>
        <Table.HeaderCell>Product title</Table.HeaderCell>
        <Table.HeaderCell>Category</Table.HeaderCell>
        <Table.HeaderCell>Quantity</Table.HeaderCell>
        <Table.HeaderCell>Unit</Table.HeaderCell>
        <Table.HeaderCell>Import Price</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell>Distributor</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
          TL027
        </Table.Cell>
        <Table.Cell>Thien Long 027</Table.Cell>
        <Table.Cell>But</Table.Cell>
        <Table.Cell>10</Table.Cell>
        <Table.Cell>Thung</Table.Cell>
        <Table.Cell>3.000</Table.Cell>
        <Table.Cell>4.000</Table.Cell>
        <Table.Cell>Thien Long</Table.Cell>
        <Table.Cell>Feb-21 22.38</Table.Cell>
      </Table.Row>
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="9">
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
