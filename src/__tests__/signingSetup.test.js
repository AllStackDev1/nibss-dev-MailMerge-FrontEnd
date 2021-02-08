import React, { useRef } from 'react';
import { shallow } from 'enzyme';
import SigningSetup from "../components/Dashboard/snippets/documents/SigningSetup"



const shallowSetup = (props = {}) => {

    return shallow(<SigningSetup {...props} />)
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

it("should render files", () => {

    const wrapper = shallowSetup({ documentFiles: ["file ;base64 imagees"], placeholders: [{ page: "placeholder" }] });
    const pdfContElem = wrapper.find(".min-width-70-percent");

    expect(pdfContElem.length).toBe(1)

})



it("should handle page container", () => {

    const wrapper = shallowSetup({ documentFiles: ["data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO 9TXL0Y4OHwAAAABJRU5ErkJggg=="], placeholders: [{ page: "placeholder" }] });
    const pdfContElem = wrapper.find(".min-width-70-percent");

    expect(pdfContElem.length).toBe(1)

    const pageConElem = wrapper.find("[data-test='page-container']");

    pageConElem.simulate("mouseOver", { preventDefault: jest.fn() })
    pageConElem.simulate("mouseLeave", { setHovering: jest.fn() })

    expect(pageConElem).toBeTruthy()

})

it("should handle page container 1", () => {

    const wrapper = shallowSetup({ documentFiles: [""], placeholders: [{ page: "placeholder" }] });
    const pdfContElem = wrapper.find(".min-width-70-percent");

    expect(pdfContElem.length).toBe(1)

    const pageConElem = wrapper.find("[data-test='page-containe-1']");

    pageConElem.simulate("mouseOver", { preventDefault: jest.fn() })
    pageConElem.simulate("mouseLeave", { setHovering: jest.fn() })

    expect(pageConElem).toBeTruthy()

})

it("should handle page container 2", () => {

    const wrapper = shallowSetup({ documentFiles: [""], placeholders: [{ page: "placeholder" }] });
    const pdfContElem = wrapper.find(".min-width-70-percent");

    expect(pdfContElem.length).toBe(1)

    const pageConElem = wrapper.find("[data-test='page-containe-2']");

    pageConElem.simulate("mouseOver", { preventDefault: jest.fn() })
    pageConElem.simulate("mouseLeave", { setHovering: jest.fn() })

    expect(pageConElem).toBeTruthy()

})

it("should load document on success", () => {

    const wrapper = shallowSetup({ documentFiles: [""], placeholders: [{ page: "placeholder" }] });
    const pdfContElem = wrapper.find(".min-width-70-percent");

    expect(pdfContElem.length).toBe(1)

    const pageDocElem = wrapper.find("[data-test='page-document']");

    pageDocElem.prop("onLoadSuccess")(20)

    expect(pageDocElem).toBeTruthy()

})


