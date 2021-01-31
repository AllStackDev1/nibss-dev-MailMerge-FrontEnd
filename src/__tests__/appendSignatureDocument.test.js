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

it("should handle document tag", () => {

    const wrapper = shallowSetup({ setNumPages: jest.fn(), docRef: { current: ["doc1", "doc2"] } });
    const docEle = wrapper.find("Document");

    docEle.prop("onLoadSuccess")({ numPages: 9 })

    expect(docEle.prop("onLoadSuccess")).toBeTruthy()

})

it("should set 75% as page container width", () => {

    const wrapper = shallowSetup({ isNumPagesSet: true })

    const pageContainerEle = wrapper.find(".bottom-margin-20");

    expect(pageContainerEle).toBeTruthy()
    expect(wrapper.find(".bottom-margin-20")).toBeTruthy();

})

