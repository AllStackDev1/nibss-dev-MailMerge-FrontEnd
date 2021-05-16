import React from 'react';
import { shallow } from 'enzyme';
import Steps from "../components/Dashboard/snippets/documents/Steps"



const shallowSetup = (props = {}) => {

    return shallow(<Steps />)
}


it("should render without errors", () => {

    const wrapper = shallowSetup();
    expect(wrapper.find("[data-test='setup-component']").length).toBe(1)

})

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

it('should match snapshot step 2', () => {
    const wrapper = shallowSetup({step: 2})
    expect(wrapper).toMatchSnapshot();
})


it('should match snapshot step 3', () => {
    const wrapper = shallowSetup({step: 3})
    expect(wrapper).toMatchSnapshot();
})


it('should match snapshot step 4', () => {
    const wrapper = shallowSetup({step: 4})
    expect(wrapper).toMatchSnapshot();
})