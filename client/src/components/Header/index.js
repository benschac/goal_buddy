import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { headerCls, logo, nav__items } from './index.css';


/**
 * @class Header
 */
const Header = ({ authenticated }) =>
  (
    <nav className={`${headerCls}`}>
      <ul className="flex flex-wrap">
        <li className={`${logo} ml3 h3`}><NavLink to="/">Goal Buddy</NavLink></li>
        {
          authenticated
          ? <li><NavLink className={`${nav__items} mr2 h3`} to="/signout">Sign Out</NavLink></li>
          : (
            <Fragment>
              <li className={`${nav__items} mr2 h3`}><NavLink to="/about">About</NavLink></li>
              <li className={`${nav__items} mr2 h3`}><NavLink to="/signin">Sign In</NavLink></li>
              <li className={`${nav__items} mr3 h3`}><NavLink to="/signup">Sign Up</NavLink></li>
            </Fragment>
          )
        }
      </ul>
    </nav>
  );

Header.propTypes = {
  /** Is user auth'ed and signed in */
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, null)(Header);

