import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * @class Header
 */
export default class Header extends React.Component {
  /** @inheritDoc */
  render() {
    return (
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/signin">Sign In</NavLink></li>
          <li><NavLink to="/signup">Sign Up</NavLink></li>
        </ul>
      </nav>
    );
  }
}
