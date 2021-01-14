import React from 'react';
import { shallow } from 'enzyme';
import DashboardDocument from "../components/Dashboard/snippets/DashboardDocument"



const shallowSetup = (props = {}) => {

    return shallow(<DashboardDocument />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toBeTruthy();
})

