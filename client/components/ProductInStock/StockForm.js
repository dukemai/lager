import React, { Component } from 'react';
import { Form, Label, Icon, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductCategory from './Category';
import ProductUnit from './Unit';

import { setCategoryForProduct, setProductField, resetProductForm } from '../../actions';
import { formatCurrency, parseNumber } from '../../utilities';

class StockForm extends Component {
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
    isSavedProductFailed: PropTypes.bool,
    isSavedProductSuccessfully: PropTypes.bool,
    resetAfterSuccess: PropTypes.func,
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
    isSavedProductFailed: false,
    isSavedProductSuccessfully: false,
    resetAfterSuccess: () => { },
  }
  componentWillReceiveProps(nextProps) {
    const { isSavedProductSuccessfully, resetAfterSuccess } = nextProps;
    if (isSavedProductSuccessfully) {
      requestAnimationFrame(() => {
        resetAfterSuccess();
      });
    }
  }
  onInputChanged = (field, value) => {
    this.props.onInputChanged(field, value);
  }
  render() {
    const {
      productImage, productName, productCode,
      productQuantity, productRetailPrice, productPrice, productUnit,
      productUnitName, isSavingProduct,
      isSavedProductFailed, isSavedProductSuccessfully,
    } = this.props;
    const { onCategoryChanged, categoryId, categoryName } = this.props;
    return (
      <Form>
        <Form.Group widths="2">
          <Form.Input
            fluid
            label="Product quantity"
            placeholder="Product quantity"
            value={productQuantity}
            onChange={(event, { value }) => { this.onInputChanged('productQuantity', parseNumber(value)); }}
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
        <Message
          success
          header="Saved"
          content="Successfully"
          visible={isSavedProductSuccessfully}
        />
        <Message
          error
          header="Save error"
          visible={isSavedProductFailed}
          content="Error happens!!!"
        />
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
  isSavedProductFailed: state.addProductToStock.isSavedProductFailed,
  isSavedProductSuccessfully: state.addProductToStock.isSavedProductSuccessfully,
  isSavingProduct: state.addProductToStock.isSavingProduct,
});
const mapDispatchToProps = dispatch => ({
  onCategoryChanged: (categoryId, categoryName) => {
    dispatch(setCategoryForProduct(categoryId, categoryName));
  },
  onInputChanged: (fieldName, fieldValue) => {
    dispatch(setProductField(fieldName, fieldValue));
  },
  resetAfterSuccess: () => {
    dispatch(resetProductForm());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StockForm);
