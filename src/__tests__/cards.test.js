import React from 'react';
import { shallow } from 'enzyme';
import DashboardCards from "../components/Dashboard/snippets/dashboard/DashboardCards"



const shallowSetup = (props = {}) => {

    return shallow(<DashboardCards {...props} />)
}

it("should test conditions", () => {
    const wrapper = shallowSetup({ documents: { documents: {}, fetching: false } })
    expect(wrapper).toMatchSnapshot()
})

it("should test conditions", () => {
    const wrapper = shallowSetup({ documents: { documents: {}, fetching: true } })
    expect(wrapper).toMatchSnapshot()
})