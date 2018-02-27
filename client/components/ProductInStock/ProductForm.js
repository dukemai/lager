import React, { Component } from 'react';
import { Form, Label, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductCategory from './Category';
import ProductUnit from './Unit';

import { setCategoryForProduct, setProductField } from '../../actions';
import { formatCurrency, parseNumber } from '../../utilities';

class ProductForm extends Component {
  static propTypes = {
    onCategoryChanged: PropTypes.func,
    onInputChanged: PropTypes.func,
    categoryId: PropTypes.string,
    categoryName: PropTypes.string,
    productImage: PropTypes.string,
    productName: PropTypes.string,
    productCode: PropTypes.string,
    productQuantity: PropTypes.number,
    productUnit: PropTypes.string,
    productUnitName: PropTypes.string,
    productPrice: PropTypes.number,
    productRetailPrice: PropTypes.number,
    isSavingProduct: PropTypes.bool,
  }
  static defaultProps = {
    onCategoryChanged: () => { },
    onInputChanged: () => { },
    categoryId: '',
    categoryName: '',
    productImage: '',
    productName: '',
    productCode: '',
    productQuantity: 0,
    productUnit: '',
    productUnitName: '',
    productPrice: 0,
    productRetailPrice: 0,
    isSavingProduct: true,
  }
  onInputChanged = (field, value) => {
    this.props.onInputChanged(field, value);
  }
  render() {
    const {
      productImage, productName, productCode,
      productQuantity, productRetailPrice, productPrice, productUnit,
      productUnitName, isSavingProduct,
    } = this.props;
    const { onCategoryChanged, categoryId, categoryName } = this.props;
    return (
      <Form>
        <Form.Group widths="equal">
          <ProductCategory
            onCategoryChanged={(id, name) => {
              onCategoryChanged(id, name);
            }}
            productCategory={categoryId}
            productCategoryName={categoryName}
          />
          <ProductUnit
            onUnitChanged={(name, value) => {
              this.onInputChanged('productUnit', name);
              this.onInputChanged('productUnitName', value);
            }}
            productUnit={productUnit}
            productUnitName={productUnitName}
            disabled={isSavingProduct}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Product name"
            placeholder="Product name"
            value={productName}
            onChange={(event, { value }) => { this.onInputChanged('productName', value); }}
            disabled={isSavingProduct}
          />
          <Form.Input
            fluid
            label="Product code"
            placeholder="Product code"
            value={productCode}
            onChange={(event, { value }) => { this.onInputChanged('productCode', value); }}
            disabled={isSavingProduct}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Product quantity"
            placeholder="Product quantity"
            value={productQuantity}
            onChange={(event, { value }) => { this.onInputChanged('productQuantity', parseNumber(value)); }}
            disabled={isSavingProduct}
          />
          <Form.Input
            fluid
            label="Product image"
            type="file"
            placeholder="Product image"
            value={productImage}
            onChange={(event, { value }) => { this.onInputChanged('productImage', value); }}
            disabled={isSavingProduct}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Input
              fluid
              label="Product price"
              placeholder="Product price"
              value={productPrice}
              onChange={(event, { value }) => { this.onInputChanged('productPrice', parseNumber(value)); }}
              disabled={isSavingProduct}
            />
            <Label pointing as="a" color="black">
              <Icon name="dollar" />
              {formatCurrency(productPrice)}
            </Label>
          </Form.Field>
          <Form.Field>
            <Form.Input
              fluid
              label="Product retail price"
              placeholder="Product retail price"
              value={productRetailPrice}
              onChange={(event, { value }) => { this.onInputChanged('productRetailPrice', parseNumber(value)); }}
              disabled={isSavingProduct}
            />
            <Label pointing color="black">
              <Icon name="dollar" />
              {formatCurrency(productRetailPrice)}
            </Label>
          </Form.Field>
        </Form.Group>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  categoryName: state.addProductToStock.categoryName,
  categoryId: state.addProductToStock.categoryId,
  productImage: state.addProductToStock.productImage,
  productName: state.addProductToStock.productName,
  productCode: state.addProductToStock.productCode,
  productQuantity: parseNumber(state.addProductToStock.productQuantity),
  productUnit: state.addProductToStock.productUnit,
  productUnitName: state.addProductToStock.productUnitName,
  productPrice: parseNumber(state.addProductToStock.productPrice),
  productRetailPrice: parseNumber(state.addProductToStock.productRetailPrice),
  isSavingProduct: state.addProductToStock.isSavingProduct,
});
const mapDispatchToProps = dispatch => ({
  onCategoryChanged: (categoryId, categoryName) => {
    dispatch(setCategoryForProduct(categoryId, categoryName));
  },
  onInputChanged: (fieldName, fieldValue) => {
    dispatch(setProductField(fieldName, fieldValue));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
