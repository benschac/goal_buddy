import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

/**
 * @class Form
 */
let Form = (props) => { //eslint-disable-line
  const {
    handleSubmit, error,
  } = props;
  return (
    <form onSubmit={(values, e) => handleSubmit(values, e)}>
      <div>
        <label htmlFor="email">Email</label>
        <Field
          name="email"
          component="input"
          type="email"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Field
          name="password"
          component="input"
          type="password"
        />
      </div>
      {error}
      <button type="submit">Submit</button>
    </form>
  );
};

const mapStateToProps = state => ({
  error: state.auth.error,
});

Form = connect(mapStateToProps, null)(Form);

Form = reduxForm({
  form: 'signin',
  fields: ['email', 'password'],
})(Form);

export default Form;
