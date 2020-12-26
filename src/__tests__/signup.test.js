import React from 'react';
import { shallow } from 'enzyme';
import Signup from "../components/auth/signup"



const shallowSetup = (props = {}) => {


    return shallow(<Signup />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})