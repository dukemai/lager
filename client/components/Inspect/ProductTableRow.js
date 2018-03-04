import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Checkbox, Dropdown } from 'semantic-ui-react'; 

const propTypes = {
  productCode: PropTypes.string,
  productName: PropTypes.string,
  productCategory: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  retailPrice: PropTypes.number,
  unit: PropTypes.string,
  distributorName: PropTypes.string,
  updatedDate: PropTypes.string,
};
const defaultProps = {
  productCode: '',
  productName: '',
  productCategory: '',
  quantity: 0,
  price: 0,
  retailPrice: 0,
  unit: '',
  distributorName: '',
  updatedDate: '',
};

const ProductTableRow = ({
  productCode, productName, productCategory,
  quantity, price, retailPrice, unit, distributorName,
  updatedDate,
}) => (
  <Table.Row>
    <Table.Cell>
      <Checkbox />
    </Table.Cell>
    <Table.Cell>
      <a href="/">
        {productCode}
      </a>
    </Table.Cell>
    <Table.Cell>{productName}</Table.Cell>
    <Table.Cell>{productCategory}</Table.Cell>
    <Table.Cell>{quantity}</Table.Cell>
    <Table.Cell>{unit}</Table.Cell>
    <Table.Cell>{price}</Table.Cell>
    <Table.Cell>{retailPrice}</Table.Cell>
    <Table.Cell>{distributorName}</Table.Cell>
    <Table.Cell>{updatedDate}</Table.Cell>
    <Table.Cell>
      <Dropdown icon="sidebar" floating className="icon">
        <Dropdown.Menu>
          <Dropdown.Item>
            <Icon name="list layout" className="right floated" />
            View
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <Icon name="edit" className="right floated" />
            Quantity
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <Icon name="edit" className="right floated" />
            Price
          </Dropdown.Item>
          <Dropdown.Item>
            <Icon name="edit" className="right floated" />
            Retail price
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Table.Cell>
  </Table.Row>
);

ProductTableRow.propTypes = propTypes;
ProductTableRow.defaultProps = defaultProps;
export default ProductTableRow;
