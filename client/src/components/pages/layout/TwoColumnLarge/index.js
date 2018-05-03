import React from 'react';
import PropTypes from 'prop-types';
import { container, aside__container } from './index.css';

/**
 * @class TwoColumnLarge
 */
export default function TwoColumnLarge({ aside, main }) {
  return (
    <section className={container}>
      <aside className={aside__container}>
        {aside}
      </aside>
      <article>
        {main}
      </article>
    </section>
  );
}


TwoColumnLarge.propTypes = {
  /** The component aside */
  aside: PropTypes.element.isRequired,
  /** The component main */
  main: PropTypes.element.isRequired,
};
