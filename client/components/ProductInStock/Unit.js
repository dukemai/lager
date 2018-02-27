import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { find } from 'lodash';

import { AutoComplete } from '../share';
import { getUnits, addUnit } from '../../server-interactions';

class Unit extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    onUnitChanged: PropTypes.func,
    productUnit: PropTypes.string,
    productUnitName: PropTypes.string,
  };
  static defaultProps = {
    token: '',
    onUnitChanged: () => { },
    productUnit: '',
    productUnitName: '',
  };
  initialCategoryState = {
    productUnit: '',
    productUnitName: '',
    isSaving: false,
    isFetchingUnits: false,
  }
  state = {
    productUnits: [],
    isReadOnly: false,
    ...this.initialCategoryState,
  }
  componentWillMount() {
    this.loadUnits();
    const { productUnit, productUnitName } = this.props;
    this.setState({
      productUnit,
      productUnitName,
    });
  }
  componentWillReceiveProps(nextProps) {
    const { productUnit, productUnitName } = nextProps;
    this.setState({
      productUnit,
      productUnitName,
    });
  }
  onNewUnitAdded = (e, { value }) => {
    const productUnitName = value;
    this.setState({
      isFetchingUnits: true,
    });
    addUnit(this.props.token, productUnitName)
      .then((data) => {
        this.setState({
          productUnit: data.unit._id,
          productUnitName: data.unit.name,
          isFetchingUnits: false,
        });
        this.loadCategories();
        requestAnimationFrame(() => {
          this.props.onUnitChanged(this.state.productUnit, this.state.productUnitName);
        });
      })
      .catch((error) => {
        this.setState({
          isFetchingUnits: false,
        });
      });
  }
  onUnitChange = (e, data) => {
    const { value } = data;
    const { productUnits } = this.state;
    const category = find(productUnits, { value });
    if (category) {
      this.setState({
        productUnit: category.value,
        productUnitName: category.text,
      });
      requestAnimationFrame(() => {
        this.props.onUnitChanged(this.state.productUnit, this.state.productUnitName);
      });
    }
  }
  loadUnits = () => {
    this.setState({
      isFetchingUnits: true,
    });
    getUnits(this.props.token)
      .then((response) => {
        const productUnits = response.units.map(doc => ({
          key: doc._id,
          text: doc.name,
          value: doc._id,
        }));
        this.setState({
          isFetchingUnits: false,
          productUnits,
        });
      })
      .catch((error) => {
        this.setState({
          isFetchingUnits: false,
        });
      });
  }
  resetUnitInformation = () => {
    this.setState({
      ...this.initialCategoryState,
    });
  }
  render() {
    const {
      productUnit,
      productUnits,
      productUnitName,
      isReadOnly,
      isSaving,
      isFetchingUnits,
    } = this.state;
    return (
      <Form.Field>
        <label>Product unit</label>
        <AutoComplete
          allowAdditions
          additionLabel="Add "
          placeholder="Product unit"
          fluid
          search
          selection
          options={productUnits}
          noResultsMessage="No unit found"
          value={productUnit}
          text={productUnitName}
          onAddItem={this.onNewUnitAdded}
          deburr
          readOnly={isReadOnly}
          onChange={this.onUnitChange}
          disabled={isSaving}
          loading={isFetchingUnits}
          onClear={this.resetUnitInformation}
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

export default connect(mapStateToProps, mapDispatchToProps)(Unit);
