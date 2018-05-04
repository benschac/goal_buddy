import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('A Button', () => {
  const component = shallow(<Button content="Hello" />);
  it('should render without throwing an error', () => {
    expect(component).toBeDefined();
  });
});
