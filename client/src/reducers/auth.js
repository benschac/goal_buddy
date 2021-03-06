import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, SIGNUP_USER, SIGNUP_ERROR } from '../actions/types';

const defaultState = { authenticated: false, error: '' };

export default (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, authenticated: false, error: action.payload };
    case SIGNUP_USER:
      return { ...state, authenticated: true };
    case SIGNUP_ERROR:
      return { ...state, authenticated: false, error: action.payload };
    default:
      return state;
  }
};

