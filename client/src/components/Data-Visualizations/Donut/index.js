import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Arch from '../base/D3Arc';

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
    /** Passed in milliseconds */
    totalTime: PropTypes.number.isRequired,
  }

  /** @inheritDoc */
  constructor(props) {
    super(props);

    this.arch = new Arch();
  }

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
    const { progress, totalTime, progressFill } = this.props;
    const throttleUpdate = _.throttle(this.arch.update, 3000);
    throttleUpdate(this.element, { progressFill }, { progress, totalTime });
  }

  /** @inheritDoc */
  render() {
    const { height, width } = this.props;
    return (
      <svg width={width} height={height} ref={el => this.element = el} />
    );
  }
}

export default Donut;
