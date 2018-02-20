import moment from 'moment';
import { SET_TOKEN, UNAUTHENTICATED, LOG_OUT, REQUEST_UPDATE_UI } from '../actions/ActionTypes';

const INITIAL_STATES = {
  token: '',
  requestUpdatedDate: moment().format(),
};

export default function app(state = INITIAL_STATES, action) {
  switch (action.type) {
    case SET_TOKEN: {
      const { token } = action;
      return {
        ...state,
        token,
      };
    }
    case UNAUTHENTICATED: {
      return {
        ...state,
        token: '',
      };
    }
    case LOG_OUT: {
      return {
        ...INITIAL_STATES,
      };
    }
    case REQUEST_UPDATE_UI: {
      return {
        ...state,
        requestUpdatedDate: moment().format(),
      };
    }
    default:
      return state;
  }
}

