import { SET_TOKEN } from './ActionTypes';

export function initApp() {

}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}
