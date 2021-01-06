import React from 'react';
import { mount } from 'enzyme';
import Document from "../components/Dashboard/empty-states/Document"





const shallowSetup = (props = {}) => {


    return mount(
        <Document />
    )
}

it("should render without errors", () => {

    const wrapper = shallowSetup();
    expect(wrapper).toBeTruthy();

})

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

