import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Checkbox, Dropdown } from 'semantic-ui-react';

const propTypes = {
};
const defaultProps = {
};

const ProductTableRow = ({ }) => (
  <Table.Row>
    <Table.Cell>
      <Checkbox />
    </Table.Cell>
    <Table.Cell>
      <a href="/">
        TL027
      </a>
    </Table.Cell>
    <Table.Cell>Thien Long 027</Table.Cell>
    <Table.Cell>But</Table.Cell>
    <Table.Cell>10</Table.Cell>
    <Table.Cell>Thung</Table.Cell>
    <Table.Cell>3.000</Table.Cell>
    <Table.Cell>4.000</Table.Cell>
    <Table.Cell>Thien Long</Table.Cell>
    <Table.Cell>Feb-21 22.38</Table.Cell>
    <Table.Cell>
      <Dropdown icon="sidebar" floating button className='icon'>
        <Dropdown.Menu>
          <Dropdown.Header icon='tags' content='Filter by tag' />
          <Dropdown.Divider />
          <Dropdown.Item>
            <Icon name='attention' className='right floated' />
            Important
        </Dropdown.Item>
          <Dropdown.Item>
            <Icon name='comment' className='right floated' />
            Announcement
        </Dropdown.Item>
          <Dropdown.Item>
            <Icon name='conversation' className='right floated' />
            Discussion
        </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Table.Cell>
  </Table.Row>
);

ProductTableRow.propTypes = propTypes;
ProductTableRow.defaultProps = defaultProps;
export default ProductTableRow;
