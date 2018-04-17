import axios from 'axios';
import history from '../utils/history';

const ROOT_URL = 'http://localhost:3000';
/**
 * Fires API Request to signin user
 *
 * @param {string} email the user email
 * @param {string} password the user password
 *
 * @return {redux.action} the action
 */
export const signinUser = ({ email, password }) => (dispatch) => { //eslint-disable-line
  debugger; //eslint-disable-line
  axios.post(`${ROOT_URL}/signin`, {
    email, password,
  }).then((res) => {
    history.push('/feature');
  })
    .catch((err) => {

    });
  dispatch({
    type: 'SIGNIN',
  });
};
