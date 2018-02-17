import moment from 'moment';
import { INIT_APP } from '../actions/ActionTypes';

const INITIAL_STATES = {
  token: '',
  requestUpdatedDate: moment().format(),
};

export default function app(state = INITIAL_STATES, action) {
  switch (action.type) {
    case INIT_APP: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}

