import React, { Component } from 'react';
import history from '../../utils/history';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  /**
   * @class Authentication
   */
  class Authentication extends Component {
    /** @inheritDoc */
    componentWillMount() {
      debugger; //eslint-disable-line
      if (!this.props.authenticated) {
        this.props.history.push('/');
      }
    }

    /** @inheritDoc */
    componentWillUpdate(nextProps) {
      debugger; //eslint-disable-line
      if (!nextProps.authenticated) {
        this.props.history.push('/');
      }
    }

    /** @inheritDoc */
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
  });

  return connect(mapStateToProps, null)(Authentication);
}
