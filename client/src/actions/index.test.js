import { authError, signoutUser } from './index';
import { AUTH_ERROR, UNAUTH_USER } from './types';
import { saveLocalStorage, loadLocalStorage } from '../utils/localStorage';
import localStorage from '../utils/__mocks__/localStorage';

describe('actions', () => {
  it('should create action that signs up and logs in a user', () => {
    // Todo -- Probably with sinon
  });

  it('should create an action that throws auth error', () => {
    const expectedAction = {
      type: AUTH_ERROR,
      payload: 'Incorrect password or username',
    };

    expect(authError('Incorrect password or username')).toEqual(expectedAction);
  });

  it('should create action to signout user', () => {
    // create an auth token and save it like we would in the browser.
    beforeEach(() => {
      localStorage.setItem('token', 'test_token_value');
    });

    const expectedAction = {
      type: UNAUTH_USER,
      payload: 'Signed out user',
    };

    expect(signoutUser()).toEqual(expectedAction);

    // Make sure the users auth token is destroyed
    afterAll(() => {
      expect(localStorage.getItem('token')).toEqual(null);
    });
  });
});
