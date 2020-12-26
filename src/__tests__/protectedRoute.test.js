import React from 'react';
import { shallow } from 'enzyme';
import ProtectedRoute from "../components/common/ProtectedRoute"



const shallowSetup = (props = {}) => {

    return shallow(<ProtectedRoute />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})