import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AutoComplete } from '../share';
import ProductCategory from './Category';
import { setCategoryForProduct } from '../../actions';
import { addDistributor, getDistributors } from '../../server-interactions';

class ProductForm extends Component {
  static propTypes = {
    onCategoryChanged: PropTypes.func,
    categoryId: PropTypes.string,
    categoryName: PropTypes.string,
  }
  static defaultProps = {
    onCategoryChanged: () => { },
    categoryId: '',
    categoryName: '',
  }
  state = {
    productImage: '',
    productName: '',
    productCode: '',
    productQuantity: '',
    productUnit: '',
    productPrice: 0,
    productRetailPrice: 0,
    isSaving: false,
    isFetchinCategories: false,
    productCategories: [],
  }
  onInputChanged = (field, value) => {
    const { state } = this;
    state[field] = value;
    this.setState({
      ...state,
    });
  }
  render() {
    const {
      productCategory, productImage, productName, productCode,
      productQuantity, productRetailPrice, productPrice, productUnit,
      productCategories, productCategoryName,
    } = this.state;
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
          <Form.Input fluid label="Product image" type="file" placeholder="Product image" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input fluid label="Product name" placeholder="Product name" />
          <Form.Input fluid label="Product code" placeholder="Product code" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input fluid label="Product quantity" placeholder="Product quantity" />
          <Form.Input fluid label="Product unit" placeholder="Product unit" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input fluid label="Product price" placeholder="Product price" />
          <Form.Input fluid label="Product retail price" placeholder="Product retail price" />
        </Form.Group>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  categoryName: state.addProductToStock.categoryName,
  categoryId: state.addProductToStock.categoryId,
});
const mapDispatchToProps = dispatch => ({
  onCategoryChanged: (categoryId, categoryName) => {
    dispatch(setCategoryForProduct(categoryId, categoryName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
