import React from 'react';
import { shallow } from 'enzyme';
import Help from "../components/Dashboard/Help"



const shallowSetup = (props = {}) => {

    return shallow(<Help />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})