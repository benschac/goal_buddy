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
      <input {...input} placeholder={label} type={type} value={input.remaining} />
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
    handleSubmit, pristine, reset, submitting, remaining,
  } = props;
  return (
    <Field name="remaining" placeholder={remaining} type="number" component={renderField} label="remaining" />
  );
};

const mapStateToProps = state => ({
  error: state.auth.error,
});

const validate = (values) => {
  const errors = {};
  if (!values.remaining) {
    errors.remaining = 'Required';
  } else if (!Number(values.remaining)) {
    errors.remaining = 'Value must be a number';
  }

  return errors;
};


Form = connect(mapStateToProps, null)(Form);

Form = reduxForm({
  form: 'remaining',
  fields: ['remaining'],
  validate,
})(Form);

export default Form;
