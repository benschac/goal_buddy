import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logger from 'redux-logger';

import App from '../App';
import rootReducer from '../../reducers';

const store = createStore(rootReducer, applyMiddleware(logger));

/**
 * The root of the application
 *
 * @class Root
 */
export default () => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);

