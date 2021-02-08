import React from 'react';
import { shallow } from 'enzyme';
import Card from "../components/Dashboard/snippets/dashboard/Card"



const shallowSetup = (props = {}) => {

    return shallow(<Card {...props} />)
}

it("should test conditions", () => {

    const wrapper = shallowSetup({ documents: { documents: {}, fetching: false } })
    expect(wrapper).toMatchSnapshot()

})