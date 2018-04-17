import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

/**
 * @class Header
 */
const Header = ({ authenticated }) =>
  (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        {console.log(authenticated)}
        {
          authenticated
          ? <li><NavLink to="/signout">Sign Out</NavLink></li>
          : (
            <Fragment>
              <li><NavLink to="/signin">Sign In</NavLink></li>
              <li><NavLink to="/signup">Sign Up</NavLink></li>
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

