import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Donut from '../Data-Visualizations/Donut';
import { loadLocalStorage, saveLocalStorage } from '../../utils/localStorage';
import timeFormat, { SECONDS, MILLISECONDS } from '../../utils/timeFormat';


let interval;

/**
 * The Timer Component
 *
 * @class Timer
 */
class Timer extends Component {
  static propTypes = {
    /** The number to countdown from (format is in minutes) */
    remaining: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.remaining = this.props.remaining * SECONDS * MILLISECONDS;
    this.throttleSave = _.throttle(saveLocalStorage, 1000);
  }

  state = { enabled: false, remaining: this.props.remaining }

  /** @inheritDoc */
  componentWillMount() {
    window.addEventListener('beforeunload', (e) => {
      if (this.state.enabled) {
        e.preventDefault();
        saveLocalStorage('remaining', this.state);
        const confirmationMessage = '\o/';
        e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
        return confirmationMessage;
      }
    });

    if (loadLocalStorage('remaining')) {
      this.setState({
        remaining: loadLocalStorage('remaining').remaining,
      });
    }

    if (!('Notification' in window)) {
      window.alert('This browser does not support desktop notification');
    }
  }

  /** @inheritDoc */
  componentWillReceiveProps({ remaining }) {
    if (remaining !== this.props.remaining) {
      this.setState({
        remaining: remaining * SECONDS * MILLISECONDS,
      });
    }
  }

  /** @inheritDoc */
  componentWillUpdate() {
    // Might not need this if we're saving state internally
    this.throttleSave(this.state);
  }

  /** @inheritDoc */
  componentWillUnmount() {
    window.removeEventListener('beforeunload');
    saveLocalStorage('remaining', this.state);
    clearInterval(interval);
  }

  onStartTimer = () => {
    this.tick(Date.now());
    this.setState({
      enabled: true,
    });
  }

  onPauseTimer = () => {
    clearInterval(interval);
    saveLocalStorage('remaining', this.state);
    this.setState({
      enabled: false,
    });
  }

  onRestart = () => {
    this.onPauseTimer();
    this.setState({
      remaining: this.remaining,
    });
  }

  /**
   * Updates the internal state of the timer remaining
   *
   * @param {number} startTime the start time
   */
  tick = (startTime) => {
    const { remaining } = this.state;
    const endTime = startTime + remaining;
    interval = setInterval(() => {
      this.setState({
        remaining: endTime - Date.now(),
      });

      if ((endTime - Date.now()) < 0) {
        this.onPauseTimer();
        new Notification('Times up, take a break!'); //eslint-disable-line
        this.setState({
          remaining: 0,
        });
      }
    }, 100);
  }

  /** @inheritDoc */
  render() {
    const { enabled, remaining } = this.state;
    return (
      <div>
        <div style={{ position: 'fixed', bottom: 0 }}>
          {timeFormat(remaining)}
        </div>
        {
        enabled
        ?
        (
          <button onClick={this.onPauseTimer}>
            Stop
          </button>
        )
        : (
          <button onClick={this.onStartTimer}>
            Start
          </button>
        )
      }
        <button onClick={this.onRestart}>
        Restart
        </button>
        <Donut
          height={500}
          width={960}
          innerRadius={230}
          outerRadius={240}
          progress={remaining}
          progressFill="#0080ff"
          backgroundFill="#ddd"
          totalTime={2 * SECONDS * MILLISECONDS}
        />
      </div>
    );
  }
}


export default Timer;
