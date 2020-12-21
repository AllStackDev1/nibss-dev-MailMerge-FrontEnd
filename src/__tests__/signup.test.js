import React from 'react';
import { mount, shallow } from 'enzyme';
import Signup from "../components/auth/signup"



const shallowSetup = (props = {}) => {


    const wrapper = shallow(<Signup />)

    return wrapper;
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})