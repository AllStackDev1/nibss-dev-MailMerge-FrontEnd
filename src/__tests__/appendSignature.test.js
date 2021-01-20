import React, { useState } from 'react';
import { shallow } from 'enzyme';
import AppendSignature from "../components/Dashboard/AppendSignature"
import enableHooks from "jest-react-hooks-shallow";
import { useSelector } from 'react-redux';


enableHooks(jest)


jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ documentId: 123 }),
}))

test("yolo", () => {

    jest.mock("react-redux", () => ({
        ...jest.requireActual("react-redux"),
        useSelector: jest.fn()
    }))

    afterEach(() => {
        useSelector.mockClear();
    });

    useSelector.mockImplementation(callback => {
        return callback({ documents: { document: "1234" } });
    });

    const renderSignatureInterfaceMock = jest.fn();
    const wrapper = shallow(<AppendSignature renderSignatureInterface={renderSignatureInterfaceMock} />)

    const result = renderSignatureInterfaceMock("e");
    expect(result).toBeUndefined();


    expect(renderSignatureInterfaceMock.mock.calls.length).toEqual(1)
    expect(wrapper.find('.lds-ring').length).toEqual(1)
    expect(wrapper).toBeTruthy();

})

it("should render snap", () => {
    const wrapper = shallow(<AppendSignature />)

    wrapper.setProps({ user: "user1", documentId: "1234", userToken: "token1" })
    expect(wrapper).toMatchSnapshot()
})

