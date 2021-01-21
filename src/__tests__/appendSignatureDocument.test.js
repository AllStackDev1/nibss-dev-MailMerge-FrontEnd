import React from 'react';
import { shallow } from 'enzyme';
import AppendSignatureDocument from "../components/Dashboard/snippets/AppendSignatureDocument"



const shallowSetup = (props = {}) => {

    return shallow(<AppendSignatureDocument {...props} />)
}

it('should render with error', () => {
    const wrapper = shallowSetup();
    expect(wrapper).toBeTruthy();
})


it("shouls render snapshot", () => {
    const wrapper = shallowSetup();
    expect(wrapper).toMatchSnapshot();
})


it("should run signatories", () => {

    const signatories = [{ absolute_x_coordinate: 123 }]

    const wrapper = shallowSetup({ signatories });

    expect(wrapper).toBeTruthy();

    expect(signatories.map(signature => signature.absolute_x_coordinate)).toEqual([123])

})

