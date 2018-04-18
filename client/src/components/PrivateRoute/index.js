import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

/**
 * HOC that renders a protected route
 *
 * @param {component} component the protected component
 *
 * @return {component} the protected component
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  if (rest.authenticated) {
    return <Component {...rest} />;
  }

  return <Redirect to="/" />;
};


PrivateRoute.propTypes = {
  /** The Component for the HOC to render */
  component: PropTypes.element.isRequired,
};

/** @inheritDoc */
const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

/** @inheritDoc */
export default withRouter(connect(mapStateToProps, null)(PrivateRoute));
