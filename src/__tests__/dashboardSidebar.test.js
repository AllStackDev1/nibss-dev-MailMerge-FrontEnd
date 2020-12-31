import React from 'react';
import { shallow } from 'enzyme';
import DashboardSidebar from "../components/common/Sidebar/DashboardSidebar"



const shallowSetup = (props = {}) => {

    return shallow(<DashboardSidebar />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

