import React, { useState } from 'react';
import { mount } from 'enzyme';
import Document from "../components/Dashboard/empty-states/Document"
import { useSelector } from 'react-redux';



jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

const shallowSetup = (props = {}) => {


    return mount(
        <Document {...props} />
    )
}

it("should render without errors", () => {

    jest.mock("react-redux", () => ({
        ...jest.requireActual("react-redux"),
        useSelector: jest.fn()
    }))

    const setDocumentMock = jest.fn();

    beforeEach(() => {
        useState.mockImplementation(init => [init, setDocumentMock])
    })

    useSelector.mockImplementation(callback => {
        return callback({ documents: { document: "1234" } });
    });

    const wrapper = shallowSetup({ uploadingDocument: true });
    expect(wrapper).toBeTruthy();

})

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

