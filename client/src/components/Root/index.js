import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route } from 'react-router-dom';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import history from '../../utils/history';

import App from '../App';
import Signin from '../pages/signin';
import Signout from '../pages/signout';
import Signup from '../pages/signup';
import Feature from '../pages/feature';
import PrivateRoute from '../PrivateRoute';
import rootReducer from '../../reducers';

const store = createStore(rootReducer, applyMiddleware(logger, reduxThunk));


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
        <PrivateRoute path="/feature" component={Feature} />
      </Fragment>
    </Router>
  </Provider>
);

