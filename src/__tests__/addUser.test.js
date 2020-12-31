import React from 'react';
import { shallow } from 'enzyme';
import AddUser from "../components/Dashboard/AddUser"



const shallowSetup = (props = {}) => {

    return shallow(<AddUser />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

