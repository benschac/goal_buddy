import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from '../../Form';
import * as actions from '../../../actions';

/**
 * @class Signin Form
 */
class Signin extends Component {
  static proptypes = {
    signinUser: PropTypes.func.isRequired,
  }
  /**
   * Is fired when user clicks the submit button
   *
   * @param {event} e the synthetic event
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const { email: { value: emailValue }, password: { value: passwordValue } } = e.target;
    const { signinUser } = this.props;
    signinUser({ email: emailValue, password: passwordValue });
  }

  /** @inheritDoc */
  render() {
    return (
      <div>
        <Form handleSubmit={this.handleSubmit} {...this.props} />
      </div>
    );
  }
}

export default connect(null, actions)(Signin);

