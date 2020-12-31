import React from 'react';
import { shallow } from 'enzyme';
import Document from "../components/Dashboard/empty-states/Document"



const shallowSetup = (props = {}) => {

    return shallow(<Document />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

