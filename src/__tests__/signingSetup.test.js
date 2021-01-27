import React from 'react';
import { shallow, mount } from 'enzyme';
import SigningSetup from "../components/Dashboard/snippets/documents/SigningSetup"



const shallowSetup = (props = {}) => {

    return shallow(<SigningSetup />)
}

describe('handle signing setup component', () => {


    it("should render without error", () => {
        const wrapper = shallowSetup()
        expect(wrapper).toBeTruthy();


    })

})

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

it("should handle signatories panel", () => {

    const wrapper = shallowSetup();

    wrapper.find("SignatoriesPanel").prop("mouseUp")()

    expect(wrapper.find("SignatoriesPanel").prop("mouseUp")()).toBeTruthy();

})



