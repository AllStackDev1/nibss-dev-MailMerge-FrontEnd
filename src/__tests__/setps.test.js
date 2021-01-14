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

