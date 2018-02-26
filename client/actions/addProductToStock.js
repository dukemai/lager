import { SET_COMPANY_FOR_PRODUCT, SET_DISTRIBUTOR_FOR_PRODUCT, SET_CATEGORY_FOR_PRODUCT } from './ActionTypes';

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
