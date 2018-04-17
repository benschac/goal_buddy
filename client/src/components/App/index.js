import React from 'react';
import Header from '../Header';
/**
 * @class App
 */
export default ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

