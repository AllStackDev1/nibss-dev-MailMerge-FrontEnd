import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import About from './components/about';




test('renders learn react link', () => {
  const wrapper = shallow(<About />)
  expect(wrapper.find("div").length).toBe(1);
  // expect(wrapper).toBeTruthy();
});
