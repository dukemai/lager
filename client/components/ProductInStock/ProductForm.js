import React, { Component } from 'react';
import { Form, Button, Icon, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import ProductCategory from './Category';
import ProductUnit from './Unit';

import { setCategoryForProduct, setProductField, resetProductForm } from '../../actions';
import { parseNumber } from '../../utilities';

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
        <Form.Field>
          <Dropzone>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </Form.Field>
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
        <Button disabled loading onClick={this.nextClicked} positive>
          Save
          <Icon name="right arrow" />
        </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
