import axios from 'axios';
import history from '../utils/history';
import { saveLocalStorage } from '../utils/localStorage';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from '../actions/types';

const ROOT_URL = 'http://localhost:3000';

/**
 *
 * @param {object} error the error object from promise
 *
 * @return {object} the auth error object to dispatch
 */
export const authError = error => ({
  type: AUTH_ERROR,
  payload: error,
});
/**
 * Fires API Request to signin user
 *
 * @param {string} email the user email
 * @param {string} password the user password
 *
 * @return {redux.action} the action
 */
export const signinUser = ({ email, password }) => (dispatch) => { //eslint-disable-line
  axios.post(`${ROOT_URL}/signin`, {
    email, password,
  }).then((res) => {
    dispatch({
      type: AUTH_USER,
    });
    saveLocalStorage('token', res.data.token);
    history.push('/feature');
  })
    .catch(() => {
      dispatch(authError('Invalid Username or Password'));
    });
};

/**
 * Signs out the user and deletes their jwt token
 *
 * @return {redux.action} the action
 */
export const signoutUser = () => {
  saveLocalStorage('token', {});
  return {
    type: UNAUTH_USER,
    payload: 'Signed out user',
  };
};
