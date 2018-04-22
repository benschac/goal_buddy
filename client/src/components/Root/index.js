import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route } from 'react-router-dom';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';


import { loadLocalStorage } from '../../utils/localStorage';
import history from '../../utils/history';

import App from '../App';
import Signin from '../pages/signin';
import Signout from '../pages/signout';
import Signup from '../pages/signup';
import Feature from '../pages/feature';
import About from '../pages/about';
import PrivateRoute from '../PrivateRoute';
import rootReducer from '../../reducers';
import { AUTH_USER } from '../../actions/types';

const store = createStore(rootReducer, applyMiddleware(logger, reduxThunk));

if (loadLocalStorage('token')) {
  store.dispatch({ type: AUTH_USER });
}

/**
 * The root of the application
 *
 * @class Root
 */
export default () => (
  <Provider store={store}>
    <Router history={history}>
      <Fragment>
        <Route path="/" component={App} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/signup" component={Signup} />
        <Route path="/about" component={About} />
        <PrivateRoute path="/feature" component={Feature} />
      </Fragment>
    </Router>
  </Provider>
);

