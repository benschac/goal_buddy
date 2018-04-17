import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import history from '../../utils/history';

import App from '../App';
import Signin from '../pages/signin';
import Signout from '../pages/signout';
import rootReducer from '../../reducers';

const store = createStore(rootReducer, applyMiddleware(logger, reduxThunk));

/**
 * The root of the application
 *
 * @class Root
 */
export default () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Route path="/" component={App} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
      </Fragment>
    </Router>
  </Provider>
);

