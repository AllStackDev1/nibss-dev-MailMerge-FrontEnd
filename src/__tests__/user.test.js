import React from 'react';
import { shallow } from 'enzyme';
import User from "../components/Dashboard/empty-states/User"



const shallowSetup = (props = {}) => {

    return shallow(<User />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

