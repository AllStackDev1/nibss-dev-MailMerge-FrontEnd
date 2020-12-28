import React from 'react';
import { shallow } from 'enzyme';
import Recipient from "../components/Dashboard/empty-states/Recipient"



const shallowSetup = (props = {}) => {

    return shallow(<Recipient />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})