import { SET_COMPANY_FOR_PRODUCT } from '../actions/ActionTypes';

const INITIAL_STATES = {
  companyId: '',
  companyName: '',
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
    default:
      return state;
  }
}

