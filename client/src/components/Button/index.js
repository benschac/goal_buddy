import React from 'react';
import PropTypes from 'prop-types';
import { button } from './index.css';

/**
 * @class Button
 */
export default function Button({ content, onClick, classNames }) {
  return (
    <button className={`${button} ${classNames}`} onClick={onClick}>
      {content}
    </button>
  );
}

Button.defaultProps = {
  onClick: null,
  classNames: '',
};

Button.propTypes = {
  /** The Content of the Button */
  content: PropTypes.string.isRequired,
  /** The onClick Function handler */
  onClick: PropTypes.func,
  /** The classNames to apply to the Button Component */
  classNames: PropTypes.string,
};

