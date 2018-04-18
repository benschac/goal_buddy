import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';


const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

/**
 * @class Form
 */
let Form = (props) => { //eslint-disable-line
  const {
    handleSubmit, pristine, reset, submitting,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={renderField} label="Email" />
      <Field name="password" type="password" component={renderField} label="Password" />
      <Field name="confirmPassword" type="password" component={renderField} label=" Confirm Password" />

      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  error: state.auth.error,
});

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  if (!values.confirmPassword) {
    errors.password = 'Required';
  }


  if (values.password !== values.confirmPassword) {
    errors.password = 'Password Confirmation must match';
  }

  return errors;
};
Form = connect(mapStateToProps, null)(Form);

Form = reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'confirmPassword'],
  validate,
})(Form);

export default Form;
