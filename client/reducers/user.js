import { AUTHENTICATING, AUTHENTICATED, UNAUTHENTICATED, LOG_OUT } from '../actions/ActionTypes';

const DEFAULT_USER = {
  userName: '',
  phoneNumber: '',
  firstName: '',
  lastName: '',
};
const INITIAL_STATES = {
  isAuthenticating: false,
  data: DEFAULT_USER,
};

export default function app(state = INITIAL_STATES, action) {
  switch (action.type) {
    case AUTHENTICATING: {
      return {
        ...state,
        isAuthenticating: true,
      };
    }
    case AUTHENTICATED: {
      const { data } = action;
      return {
        ...state,
        isAuthenticating: false,
        data: data.user,
      };
    }
    case UNAUTHENTICATED: {
      return {
        ...state,
        isAuthenticating: false,
        data: DEFAULT_USER,
      };
    }
    case LOG_OUT: {
      return {
        ...INITIAL_STATES,
      };
    }
    default:
      return state;
  }
}

