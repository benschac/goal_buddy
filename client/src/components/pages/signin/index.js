import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../../actions';

/**
 * @class Form
 */
let Form = (props) => { //eslint-disable-line
  const { handleSubmit } = props;
  return (
    <form onSubmit={(values, e) => handleSubmit(values, e)}>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Field name="password" component="input" type="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

Form = reduxForm({
  // a unique name for the form
  form: 'signin',
  fields: ['email', 'password'],
})(Form);

class Signin extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);

    debugger; //eslint-disable-line
    this.props.signinUser({ email: e.target.email.value, password: e.target.password.value });
  }

  render() {
    return (
      <Form handleSubmit={this.handleSubmit} />
    );
  }
}

export default connect(null, actions)(Signin);

