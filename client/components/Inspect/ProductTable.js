import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Icon, Table, Checkbox, Dimmer, Loader } from 'semantic-ui-react';

import ProductTableRow from './ProductTableRow';
import { Paging } from '../share';
import { getProductsInStock } from '../../server-interactions';
import { formatDateTime, formatCurrency } from '../../utilities';

const propTypes = {
  token: PropTypes.string,
};
const defaultProps = {
  token: '',
};

class ProductTable extends React.Component {
  state = {
    isLoading: false,
    productsInStock: [],
    total: 0,
    pageSize: 3,
    currentPage: 0,
  }
  componentWillMount() {
    const { currentPage, pageSize } = this.state;
    getProductsInStock(this.props.token, currentPage, pageSize)
      .then((res) => {
        this.setState({
          productsInStock: res.productsInStock,
          total: res.total,
        });
      });
  }
  render() {
    const {
      isLoading, productsInStock, total, pageSize,
    } = this.state;
    const totalPages = total / pageSize;
    return (
      <div>
        <Dimmer inverted active={isLoading}>
          <Loader active={isLoading} />
        </Dimmer>
        <Table selectable className="inspectScreen__table" size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Checkbox />
              </Table.HeaderCell>
              <Table.HeaderCell width="1">Product code</Table.HeaderCell>
              <Table.HeaderCell width="3">Product title</Table.HeaderCell>
              <Table.HeaderCell width="1">Category</Table.HeaderCell>
              <Table.HeaderCell width="1">Quantity</Table.HeaderCell>
              <Table.HeaderCell>Unit</Table.HeaderCell>
              <Table.HeaderCell width="2">Import Price</Table.HeaderCell>
              <Table.HeaderCell width="2">Price</Table.HeaderCell>
              <Table.HeaderCell>Distributor</Table.HeaderCell>
              <Table.HeaderCell width="2">Date</Table.HeaderCell>
              <Table.HeaderCell><Icon name="sidebar" /></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              productsInStock.map(productInStock => (
                <ProductTableRow
                  key={productInStock._id}
                  productCode={productInStock.productId.code}
                  productName={productInStock.productId.name}
                  productCategory={productInStock.productId.category.name}
                  price={formatCurrency(productInStock.price)}
                  retailPrice={formatCurrency(productInStock.retailPrice)}
                  quantity={productInStock.quantity}
                  unit={productInStock.unit.name}
                  distributorName={productInStock.distributor.name}
                  updatedDate={formatDateTime(productInStock.updatedDate)}
                />
              ))
            }
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="11">
                <Paging totalPages={totalPages} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>

      </div>
    );
  }
}

ProductTable.propTypes = propTypes;
ProductTable.defaultProps = defaultProps;

const mapStateToProps = state => ({
  token: state.app.token,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);
