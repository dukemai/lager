import { SET_COMPANY_FOR_PRODUCT, SET_DISTRIBUTOR_FOR_PRODUCT } from '../actions/ActionTypes';

const INITIAL_STATES = {
  companyId: '',
  companyName: '',
  distributorId: '',
  distributorName: '',
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
    default:
      return state;
  }
}

