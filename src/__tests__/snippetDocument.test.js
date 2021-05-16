import React from 'react';
import { mount } from 'enzyme';
import Document from "../components/Dashboard/snippets/Document"


const shallowSetup = (props = {}) => {

    return mount(
        <Document {...props} />
    )
}

it("should click view document container", () => {

    const clicker = jest.fn();
    const wrapper = shallowSetup({ document: { documentTitle: "sample docs" }, viewDocument: jest.fn() })
    const documentEle = wrapper.find("[data-testid='container-parent']").at(0)

    let result = clicker();

    documentEle.simulate("click")
    expect(result).toBeUndefined();
    expect(clicker.mock.calls.length).toEqual(1);
})

it("should click view document button", () => {

    const clicker = jest.fn();
    const wrapper = shallowSetup({ dashboard: true, document: { documentTitle: "sample docs" }, viewDocument: jest.fn(), viewStats: jest.fn() })

    const documentEle = wrapper.find("[data-test='view-doc-btn']").at(0)

    let result = clicker();

    documentEle.simulate("click")
    expect(result).toBeUndefined();
    expect(clicker.mock.calls.length).toEqual(1);


})