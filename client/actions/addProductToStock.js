import {
  SET_COMPANY_FOR_PRODUCT, SET_DISTRIBUTOR_FOR_PRODUCT, SET_CATEGORY_FOR_PRODUCT, SET_PRODUCT_FIELD,
  SAVING_PRODUCT, SAVED_PRODUCT, SAVED_PRODUCT_FAILED, SELECT_TAB,
} from './ActionTypes';

import { addProduct, addProductInStock } from '../server-interactions';

export function setCompanyForProduct(companyId, companyName) {
  return {
    type: SET_COMPANY_FOR_PRODUCT,
    companyId,
    companyName,
  };
}

export function setDistributorForProduct(distributorId, distributorName) {
  return {
    type: SET_DISTRIBUTOR_FOR_PRODUCT,
    distributorId,
    distributorName,
  };
}

export function setCategoryForProduct(categoryId, categoryName) {
  return {
    type: SET_CATEGORY_FOR_PRODUCT,
    categoryId,
    categoryName,
  };
}

export function setProductField(fieldName, fieldValue) {
  return {
    type: SET_PRODUCT_FIELD,
    fieldName,
    fieldValue,
  };
}

export function saveProduct() {
  return (dispatch, getState) => {
    dispatch({
      type: SAVING_PRODUCT,
    });
    const state = getState();
    const {
      companyId,
      distributorId,
      categoryId,
      productImage,
      productName,
      productCode,
      productQuantity,
      productUnit,
      productPrice,
      productRetailPrice,
    } = state.addProductToStock;
    const {
      token,
    } = state.app;
    addProduct(
      token, productName, productCode, productImage,
      categoryId, companyId,
    )
      .then((res) => {
        addProductInStock(
          token, res.product._id, distributorId, productQuantity, productPrice,
          productRetailPrice, productUnit,
        )
          .then((productInStockResult) => {
            dispatch({
              type: SAVED_PRODUCT,
            });
          })
          .catch((error) => {
            dispatch({
              type: SAVED_PRODUCT_FAILED,
            });
          });
      })
      .catch((error) => {
        dispatch({
          type: SAVED_PRODUCT_FAILED,
        });
      });
  };
}

export function selectTab(activeTab) {
  return {
    type: SELECT_TAB,
    activeTab,
  };
}
