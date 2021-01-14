import React from 'react';
import { shallow } from 'enzyme';
import AppendSignatureDocument from "../components/Dashboard/snippets/AppendSignatureDocument"



const shallowSetup = (props = {}) => {

    return shallow(<AppendSignatureDocument />)
}

it('should render with error', () => {
    // const calculateOffsetPDFMock = jest.fn();
    const wrapper = shallowSetup();
    expect(wrapper).toBeTruthy();
})


it("shouls render snapshot", () => {

    const wrapper = shallowSetup();
    expect(wrapper).toMatchSnapshot();

})

