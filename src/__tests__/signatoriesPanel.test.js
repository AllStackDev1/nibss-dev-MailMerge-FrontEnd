import React from 'react';
import { shallow } from 'enzyme';
import SignatoriesPanel from "../components/Dashboard/snippets/documents/SignatoriesPanel"



const shallowSetup = (props = {}) => {


    return shallow(<SignatoriesPanel {...props} />)
}

it('should match snapshot', () => {

    const selectUser = {}

    const wrapper = shallowSetup({ signatories: [{ name: "name" }] })
    expect(wrapper).toMatchSnapshot();
})


