import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Segment, Progress, Button, Sticky, Label, List } from 'semantic-ui-react';

import { saveProduct, selectTab, setCompanyForProduct, setDistributorForProduct, setCategoryForProduct } from '../../actions';

const propTypes = {
  companyName: PropTypes.string,
  distributorName: PropTypes.string,
  categoryName: PropTypes.string,
  isSavingProduct: PropTypes.bool,
  saveProductClicked: PropTypes.func,
  removeManufacturerClicked: PropTypes.func,
  removeDistributorClicked: PropTypes.func,
  isAbleToSave: PropTypes.bool,
};
const defaultProps = {
  companyName: '',
  distributorName: '',
  categoryName: '',
  isSavingProduct: false,
  saveProductClicked: () => {},
  removeManufacturerClicked: () => {},
  removeDistributorClicked: () => {},
  isAbleToSave: false,
};

const RightPanel = ({
  isSavingProduct, companyName, distributorName, categoryName, saveProductClicked,
  removeManufacturerClicked, removeDistributorClicked, isAbleToSave,
}) => (
  <Sticky>
    <Segment color="olive">
      <Button disabled={!isAbleToSave} onClick={saveProductClicked} loading={isSavingProduct} positive>
        Save Product
      </Button>
    </Segment>
    <Segment color="olive">
      <List color="blue" divided selection>
        <List.Item>
          <div className="manufacturerForm__rightPanel__label">
            Company
          </div>
          {
            companyName && (
              <Label content={companyName} onRemove={removeManufacturerClicked} color="blue" removeIcon="delete" />
            )
          }
        </List.Item>
        <List.Item>
          <div className="manufacturerForm__rightPanel__label">
            Distributor
          </div>
          {
            distributorName && (
              <Label content={distributorName} onRemove={removeDistributorClicked} color="blue" removeIcon="delete" />
            )
          }
        </List.Item>
        <List.Item>
          <div className="manufacturerForm__rightPanel__label">
            Category
          </div>
          {
            categoryName && (
              <Label content={categoryName} color="blue" onRemove={()=>{}} removeIcon="delete" />
            )
          }
        </List.Item>
      </List>
    </Segment>
    <Segment>
      <Progress color="blue" size="small" percent={33.3} active>
        Creating product
      </Progress>
    </Segment>
  </Sticky>
);

RightPanel.propTypes = propTypes;
RightPanel.defaultProps = defaultProps;

const mapStateToProps = state => ({
  companyName: state.addProductToStock.companyName,
  distributorName: state.addProductToStock.distributorName,
  categoryName: state.addProductToStock.categoryName,
  isSavingProduct: state.addProductToStock.isSavingProduct,
  isAbleToSave: state.addProductToStock.isAbleToSave,
});

const mapDispatchToProps = dispatch => ({
  saveProductClicked: () => {
    dispatch(saveProduct());
  },
  removeManufacturerClicked: () => {
    dispatch(setCompanyForProduct());
    dispatch(selectTab(0));
  },
  removeDistributorClicked: () => {
    dispatch(setDistributorForProduct());
    dispatch(selectTab(1));
  },
  removeCategoryClicked: () => {
    dispatch(setCategoryForProduct());
    dispatch(selectTab(2));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
