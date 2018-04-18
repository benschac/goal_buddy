import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from './signupform';
import * as actions from '../../../actions';

/**
 * @class Signup
 */
class Signup extends Component {
  /**
   * Handles user submission
   *
   * @param {event} react synthetic event
   *
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      email: { value: emailValue },
      password: { value: passwordValue },
      confirmPassword: { value: confirmPasswordValue },
    } = e.target;
    const { signup } = this.props;
    signup({ email: emailValue, password: passwordValue });
  }
  /** @inheritDoc */
  render() {
    return (
      <div>
        <Form handleSubmit={this.handleSubmit} submit />
      </div>
    );
  }
}

/** @inheritDoc */
const mapDispatchToProps = (dispatch, ownProps) => ({
  signup: (payload) => {
    dispatch(actions.signupUser(payload));
  },
  signupFailure: (error) => {
    dispatch(actions.signupError(error));
  },
});

export default connect(null, mapDispatchToProps)(Signup);
