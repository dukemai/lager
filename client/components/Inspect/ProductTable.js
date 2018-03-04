import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Icon, Table, Checkbox, Dimmer, Loader } from 'semantic-ui-react';

import ProductTableRow from './ProductTableRow';
import { getProductsInStock } from '../../server-interactions';

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
  }
  componentWillMount() {
    getProductsInStock(this.props.token)
      .then((res) => {
        this.setState({
          productsInStock: res.productsInStock,
        });
      });
  }
  render() {
    const { isLoading, productsInStock } = this.state;
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
                  price={productInStock.price}
                  retailPrice={productInStock.retailPrice}
                  quantity={productInStock.quantity}
                  unit={productInStock.unit.name}
                  distributorName={productInStock.distributor.name}
                />
              ))
            }
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="11">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="left chevron" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="right chevron" />
                  </Menu.Item>
                </Menu>
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
