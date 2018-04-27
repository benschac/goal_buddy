import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Arch from '../base/D3Arc';
// Todo -- Let's change this rule in our linter
import { container__svg } from './index.css'; //eslint-disable-line

// Todo -- This component might need to be more generic
// right now it's handling a v. specific case for the Timer component

/**
 * @class Donut Data Visualization Component
 */
class Donut extends Component {
  static propTypes = {
    /** The width of the visualization */
    width: PropTypes.number.isRequired,
    /** The height of the visualization */
    height: PropTypes.number.isRequired,
    /** The progress arc line to be updated from user progress */
    progress: PropTypes.number.isRequired,
    /** The color of the progress fill */
    progressFill: PropTypes.string.isRequired,
    /** Passed in milliseconds */
    totalTime: PropTypes.number.isRequired,
    /** The children */
    children: PropTypes.element.isRequired,
  }

  /** @inheritDoc */
  constructor(props) {
    super(props);

    this.arch = new Arch();
  }

  /** @inheritDoc */
  componentDidMount() {
    const {
      progress,
      totalTime,
      innerRadius,
      outerRadius,
      backgroundFill,
    } = this.props;
    const props = {
      innerRadius, outerRadius, backgroundFill,
    };
    const state = { progress, totalTime };
    this.arch.create(this.element, props, state);
  }


  /** @inheritDoc */
  componentDidUpdate() {
    const {
      progress,
      totalTime,
      innerRadius,
      outerRadius,
      backgroundFill,
      progressFill,
      isReset,
    } = this.props;
    const props = {
      innerRadius, outerRadius, backgroundFill,
    };
    const state = { progress, totalTime };
    const throttleUpdate = _.throttle(this.arch.update, 1000);

    if (isReset) {
      this.arch.destroy(this.element);
      this.arch.create(this.element, props, state);
    } else {
      throttleUpdate(this.element, { progressFill }, { progress, totalTime });
    }
  }

  /** @inheritDoc */
  componentWillUnmount() {
    this.arch.destroy(this.element);
  }

  /** @inheritDoc */
  render() {
    const { children } = this.props;
    return (
      <div className={container__svg}>
        {children}
        <svg
          width="100%"
          height="500"
          viewBox="0 0 960 500"
          preserveAspectRatio="xMidYMid meet"
          className="arc"
          ref={el => this.element = el}
        /> {/* //eslint-disable-line */}
      </div>
    );
  }
}

export default Donut;
