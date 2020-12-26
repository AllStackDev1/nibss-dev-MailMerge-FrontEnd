import React from 'react';
import { shallow } from 'enzyme';
import ProtectedAuth from "../components/common/ProtectedAuth"



const shallowSetup = (props = {}) => {

    return shallow(<ProtectedAuth />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})