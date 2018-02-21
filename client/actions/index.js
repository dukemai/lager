import { SET_TOKEN, AUTHENTICATED, AUTHENTICATING, UNAUTHENTICATED, LOG_OUT } from './ActionTypes';
import { authenticate as sendAuthenticateReq, logout as sendLogOutReq } from '../server-interactions';

export function initApp() {

}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}

/*
User
*/

export function authenticate() {
  return (dispatch, getState) => {
    dispatch({
      type: AUTHENTICATING,
    });
    const state = getState();
    const { token } = state.app;
    sendAuthenticateReq(token)
      .then((data) => {
        dispatch({
          type: AUTHENTICATED,
          data,
        });
      })
      .catch((error) => {
        dispatch({
          type: UNAUTHENTICATED,
        });
      });
  };
}

export function logOut() {
  return (dispatch, getState) => {
    sendLogOutReq()
      .then(() => {
        dispatch({
          type: LOG_OUT,
        });
      });
  };
}
