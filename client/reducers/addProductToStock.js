import 'rxjs';

import {
  SET_COMPANY_FOR_PRODUCT, SET_DISTRIBUTOR_FOR_PRODUCT,
  SET_CATEGORY_FOR_PRODUCT, SET_PRODUCT_FIELD,
  SAVING_PRODUCT, SAVED_PRODUCT, SAVED_PRODUCT_FAILED,
  SELECT_TAB, RESET_PRODUCT_FORM, VALIDATE_PRODUCT_FORM,
} from '../actions/ActionTypes';

const INITIAL_PRODUCT = {
  productImage: '',
  productName: '',
  productCode: '',
  productQuantity: 0,
  productUnit: '',
  productUnitName: '',
  productPrice: 0,
  productRetailPrice: 0,
  isSavingProduct: false,
  isSavedProductSuccessfully: false,
  isSavedProductFailed: false,
  isAbleToSave: false,
};

const INITIAL_STATES = {
  companyId: '',
  companyName: '',
  distributorId: '',
  distributorName: '',
  categoryId: '',
  categoryName: '',
  activeTab: 0,
  ...INITIAL_PRODUCT,
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
    case SAVING_PRODUCT: {
      return {
        ...state,
        isSavingProduct: true,
      };
    }
    case SAVED_PRODUCT: {
      return {
        ...state,
        isSavingProduct: false,
        isSavedProductFailed: false,
        isSavedProductSuccessfully: true,
      };
    }
    case SAVED_PRODUCT_FAILED: {
      return {
        ...state,
        isSavingProduct: false,
        isSavedProductFailed: true,
        isSavedProductSuccessfully: false,
      };
    }
    case SELECT_TAB: {
      const { activeTab } = action;
      return {
        ...state,
        activeTab,
      };
    }
    case RESET_PRODUCT_FORM: {
      return {
        ...state,
        ...INITIAL_PRODUCT,
      };
    }
    default:
      return state;
  }
}

const addProductEpic = action$ =>
  action$.filter(action => action.type === SET_CATEGORY_FOR_PRODUCT
  || action.type === SET_COMPANY_FOR_PRODUCT || action.type === SET_DISTRIBUTOR_FOR_PRODUCT
  || action.type === SET_PRODUCT_FIELD)
    .mapTo({ type: VALIDATE_PRODUCT_FORM });

export { addProductEpic };
