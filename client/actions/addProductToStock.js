import { SET_COMPANY_FOR_PRODUCT } from './ActionTypes';

export function setCompanyForProduct(companyId, companyName) {
  return {
    type: SET_COMPANY_FOR_PRODUCT,
    companyId,
    companyName,
  };
}
