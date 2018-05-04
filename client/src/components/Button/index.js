import React from 'react';
import PropTypes from 'prop-types';
import { button } from './index.css';

/**
 * @class Button
 */
export default function Button({ content, onClick }) {
  return (
    <button className={button} onClick={onClick}>
      {content}
    </button>
  );
}

// Button.defaultProps = {
//   onClick: null,
// };

Button.propTypes = {
  /** The Content of the Button */
  content: PropTypes.string.isRequired,
  /** The onClick Function handler */
  onClick: PropTypes.func,
};

