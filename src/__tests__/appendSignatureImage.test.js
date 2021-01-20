import React from 'react';
import { shallow } from 'enzyme';
import AppendSignatureImage from "../components/Dashboard/snippets/AppendSignatureImage"



const shallowSetup = (props = {}) => {

    return shallow(<AppendSignatureImage />)
}

it('should render with error', () => {
    const wrapper = shallowSetup();
    expect(wrapper).toBeTruthy();
})

it("shouls render snapshot", () => {

    const wrapper = shallowSetup();
    expect(wrapper).toMatchSnapshot();

})

