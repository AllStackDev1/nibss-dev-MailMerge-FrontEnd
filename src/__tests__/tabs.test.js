import React from 'react';
import { shallow } from 'enzyme';
import Tabs from "../components/Dashboard/snippets/documents/Tabs"



const shallowSetup = (props = {}) => {

    return shallow(<Tabs />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

