import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from './signinform';
import * as actions from '../../../actions';
import { inputs, submit, fields } from './signinMeta';


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
        {/* Create a module for forms and input fields */}
        <Form
          handleSubmit={this.handleSubmit}
          inputs={inputs}
          submit={submit}
          fields={fields}
          {...this.props}
        />
      </div>
    );
  }
}
export default connect(null, actions)(Signin);

