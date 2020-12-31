import React from 'react';
import { shallow } from 'enzyme';
import AddSignature from "../components/Dashboard/AddSignature"



const shallowSetup = (props = {}) => {

    return shallow(<AddSignature />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

