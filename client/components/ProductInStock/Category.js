import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { find } from 'lodash';

import { AutoComplete } from '../share';
import { getCategories, addCategory } from '../../server-interactions';

class Category extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    onCategoryChanged: PropTypes.func,
    productCategory: PropTypes.string,
    productCategoryName: PropTypes.string,
  };
  static defaultProps = {
    token: '',
    onCategoryChanged: () => { },
    productCategory: '',
    productCategoryName: '',
  };
  initialCategoryState = {
    productCategory: '',
    productCategoryName: '',
    isSaving: false,
    isFetchingCategories: false,
  }
  state = {
    productCategories: [],
    isReadOnly: false,
    ...this.initialCategoryState,
  }
  componentWillMount() {
    this.loadCategories();
    const { productCategory, productCategoryName } = this.props;
    this.setState({
      productCategory,
      productCategoryName,
    });
  }
  componentWillReceiveProps(nextProps) {
    const { productCategory, productCategoryName } = nextProps;
    this.setState({
      productCategory,
      productCategoryName,
    });
  }
  onNewCategoryAdded = (e, { value }) => {
    const productCategoryName = value;
    this.setState({
      isFetchingCategories: true,
    });
    addCategory(this.props.token, productCategoryName)
      .then((data) => {
        this.setState({
          productCategory: data.category._id,
          productCategoryName: data.category.name,
          isFetchingCategories: false,
        });
        this.loadCategories();
        requestAnimationFrame(() => {
          this.props.onCategoryChanged(this.state.productCategory, this.state.productCategoryName);
        });
      })
      .catch((error) => {
        this.setState({
          isFetchingCategories: false,
        });
        console.log(error);
      });
  }
  onCategoryChange = (e, data) => {
    const { value } = data;
    const { productCategories } = this.state;
    const category = find(productCategories, { value });
    if (category) {
      this.setState({
        productCategory: category.value,
        productCategoryName: category.text,
      });
      requestAnimationFrame(() => {
        this.props.onCategoryChanged(this.state.productCategory, this.state.productCategoryName);
      });
    }
  }
  loadCategories = () => {
    this.setState({
      isFetchingCategories: true,
    });
    getCategories(this.props.token)
      .then((response) => {
        const productCategories = response.categories.map(doc => ({
          key: doc._id,
          text: doc.name,
          value: doc._id,
        }));
        this.setState({
          isFetchingCategories: false,
          productCategories,
        });
      })
      .catch((error) => {
        this.setState({
          isFetchingCategories: false,
        });
      });
  }
  resetCategoryInformation = () => {
    this.setState({
      ...this.initialCategoryState,
    });
  }
  render() {
    const {
      productCategory,
      productCategories,
      productCategoryName,
      isReadOnly,
      isSaving,
      isFetchingCategories,
    } = this.state;
    return (
      <Form.Field>
        <label>Product category</label>
        <AutoComplete
          allowAdditions
          additionLabel="Add "
          placeholder="Product category"
          fluid
          search
          selection
          options={productCategories}
          noResultsMessage="No category found"
          value={productCategory}
          text={productCategoryName}
          onAddItem={this.onNewCategoryAdded}
          deburr
          readOnly={isReadOnly}
          onChange={this.onCategoryChange}
          disabled={isSaving}
          loading={isFetchingCategories}
          onClear={this.resetCategoryInformation}
        />
      </Form.Field >
    );
  }
}

const mapStateToProps = state => ({
  token: state.app.token,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
