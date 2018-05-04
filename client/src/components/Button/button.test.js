import React from 'react';
import Button from './index';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { button } from './index.css';

console.log(button);

Enzyme.configure({ adapter: new Adapter() });

describe('A Button', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<Button content="Hello" />).contains(<button className={button}>Hello</button>)).toBe(true);
  });
});
