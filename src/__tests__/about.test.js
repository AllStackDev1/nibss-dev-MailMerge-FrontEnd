import React from 'react';
import { mount, shallow } from 'enzyme';
import About from "../components/about"



const shallowSetup = (props = {}) => {


    const wrapper = shallow(<About />)

    return wrapper;
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})