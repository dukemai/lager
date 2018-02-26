import { SET_COMPANY_FOR_PRODUCT, SET_DISTRIBUTOR_FOR_PRODUCT, SET_CATEGORY_FOR_PRODUCT } from '../actions/ActionTypes';

const INITIAL_STATES = {
  companyId: '',
  companyName: '',
  distributorId: '',
  distributorName: '',
  categoryId: '',
  categoryName: '',
};

export default function app(state = INITIAL_STATES, action) {
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
    default:
      return state;
  }
}

