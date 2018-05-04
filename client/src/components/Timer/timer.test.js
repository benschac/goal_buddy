import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Timer from './index';
import { getTotalMilliseconds } from '../../utils/timeFormat';

jest.useFakeTimers();

Enzyme.configure({ adapter: new Adapter() });

describe('Timer', () => {
  let component;
  let mountComponent;
  let remaining;

  beforeAll(() => {
    window.alert = window.console.log.bind(window.console);
    component = shallow(<Timer remaining={30} />);
    localStorage.setItem('token', 'fake_token');
    remaining = getTotalMilliseconds(5);
  });

  it('should exist', () => {
    expect(component).toBeDefined();
  });

  it('should render timer', () => {
    expect(component.find('.timer').length).toEqual(1);
    expect(component.find('.timer__controls').length).toEqual(1);
  });

  it('initial state', () => {
    expect(component.state()).toEqual({ enabled: false, remaining: 30, restarted: false });
  });

  it('should retrieve data from localStorage on mount', () => {
    localStorage.setItem('remaining', remaining);
    mountComponent = mount(<Timer remaining={30} />);
    expect(mountComponent.state().remaining).toEqual(remaining);
  });

  describe('control functions', () => {
    // Todo -- Mock the actual change in time.
    it('should start the timer', () => {
      mountComponent.instance().onStartTimer();
      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(mountComponent.state().enabled).toBe(true);
    });

    it('should pause the timer', () => {
      mountComponent.instance().onPauseTimer();
      expect(mountComponent.state().enabled).toBe(false);
    });

    it('should reset the timer', () => {
      mountComponent.instance().onRestartTimer();
      expect(mountComponent.state().enabled).toBe(false);
    });
  });

  // Move to button functional tests.


  // describe('control buttons', () => {
  //   it('should start the timer', () => {
  //     console.log(mountComponent.debug());
  //     mountComponent.instance().onStartTimer = jest.fn();
  //     const startBtn = mountComponent.find('.start');
  //     expect(startBtn.length).toEqual(1);
  //     startBtn.find('button').simulate('click');
  //     expect(mountComponent.instance().onStartTimer).toHaveBeenCalledTimes(1);
  //   });
  // });
});

