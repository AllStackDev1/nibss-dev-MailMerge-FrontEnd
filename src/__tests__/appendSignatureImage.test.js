import React from 'react';
import { shallow } from 'enzyme';
import AppendSignatureImage from "../components/Dashboard/snippets/AppendSignatureImage"



const shallowSetup = (props = {}) => {

    return shallow(<AppendSignatureImage {...props} />)
}

it('should render with error', () => {
    const wrapper = shallowSetup();
    expect(wrapper).toBeTruthy();
})

it("shouls render snapshot", () => {

    const wrapper = shallowSetup();
    expect(wrapper).toMatchSnapshot();

})

it("should load image error", () => {

    const wrapper = shallowSetup({
        setImageError: jest.fn()
    });
    const signatureImg = wrapper.find(".right-margin-10");

    signatureImg.prop("onError")();
    expect(signatureImg.prop("onError")).toBeTruthy();

    signatureImg.prop("onLoad")({ target: "200" })

})

