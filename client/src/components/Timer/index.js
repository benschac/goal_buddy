import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Donut from '../Data-Visualizations/Donut';
import { loadLocalStorage, saveLocalStorage } from '../../utils/localStorage';
import timeFormat, { getTotalMilliseconds } from '../../utils/timeFormat';
import classNames from './index.css';


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
    this.remaining = getTotalMilliseconds(this.props.remaining);
    this.throttleSave = _.throttle(saveLocalStorage, 1000);
  }

  state = { enabled: false, remaining: this.props.remaining, restarted: false }

  /** @inheritDoc */
  componentWillMount() {
    // Todo -- This might be something I want to refactor for any field with a value
    // in it.
    window.addEventListener('beforeunload', (e) => {
      if (this.state.enabled) {
        e.preventDefault();
        saveLocalStorage('remaining', this.state);
        const confirmationMessage = '\o/'; //eslint-disable-line
        e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
        return confirmationMessage;
      }

      return 0;
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
        remaining: getTotalMilliseconds(remaining),
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

  /**
   * Fired on start of Timer
   */
  onStartTimer = () => {
    this.tick(Date.now());
    this.setState({
      enabled: true,
      restarted: false,
    });
  }

  /**
   * Fired on pause of timer
   */
  onPauseTimer = () => {
    clearInterval(interval);
    saveLocalStorage('remaining', this.state);
    this.setState({
      enabled: false,
    });
  }

  /**
   * Fired on restart of timer
   */
  onRestart = () => {
    this.onPauseTimer();
    this.setState({
      remaining: this.remaining,
      restarted: true,
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
      let remaining = endTime - Date.now(); //eslint-disable-line
      this.setState({
        remaining,
      });

      if (remaining <= 0) {
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
    const { enabled, remaining, restarted } = this.state;
    return (
      <div className="timer">
        <div className={classNames.timer__controls}>
          {timeFormat(remaining)}
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
          <button className="hello" onClick={this.onRestart}>
        Restart
          </button>
        </div>
        <Donut
          height={500}
          width={960}
          innerRadius={230}
          outerRadius={240}
          isReset={restarted}
          progress={remaining}
          progressFill="#0080ff"
          backgroundFill="#ddd"
          totalTime={getTotalMilliseconds(this.props.remaining)}
        />
      </div>
    );
  }
}


export default Timer;
