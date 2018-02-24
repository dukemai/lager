import { SET_COMPANY_FOR_PRODUCT, SET_DISTRIBUTOR_FOR_PRODUCT } from './ActionTypes';

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
