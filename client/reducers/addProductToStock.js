import {
  SET_COMPANY_FOR_PRODUCT, SET_DISTRIBUTOR_FOR_PRODUCT,
  SET_CATEGORY_FOR_PRODUCT, SET_PRODUCT_FIELD,
} from '../actions/ActionTypes';

const INITIAL_STATES = {
  companyId: '',
  companyName: '',
  distributorId: '',
  distributorName: '',
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
};

export default function addProductToStock(state = INITIAL_STATES, action) {
  switch (action.type) {
    case SET_COMPANY_FOR_PRODUCT: {
      const { companyId, companyName } = action;
      return {
        ...state,
        companyId,
        companyName,
      };
    }
    case SET_DISTRIBUTOR_FOR_PRODUCT: {
      const { distributorId, distributorName } = action;
      return {
        ...state,
        distributorId,
        distributorName,
      };
    }
    case SET_CATEGORY_FOR_PRODUCT: {
      const { categoryId, categoryName } = action;
      return {
        ...state,
        categoryId,
        categoryName,
      };
    }
    case SET_PRODUCT_FIELD: {
      const { fieldName, fieldValue } = action;
      const newState = {
        ...state,
      };
      newState[fieldName] = fieldValue;
      return newState;
    }
    default:
      return state;
  }
}

