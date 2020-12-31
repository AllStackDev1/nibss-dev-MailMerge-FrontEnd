import React from 'react';
import { shallow } from 'enzyme';
import About from "../components/about"



const shallowSetup = (props = {}) => {
    return shallow(<About />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

