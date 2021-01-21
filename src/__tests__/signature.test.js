import React from 'react';
import { shallow } from 'enzyme';
import Signature from "../components/Dashboard/snippets/Signature"
import { useSelector } from 'react-redux';



const shallowSetup = (props = {}) => {

    return shallow(<Signature {...props} />)
}

describe('handle setup signatoies component', () => {

    jest.mock("react-redux", () => ({
        ...jest.requireActual("react-redux"),
        useSelector: jest.fn()
    }));

    useSelector.mockImplementation(callback => {
        return callback({ recipients: {} });
    });

    const wrapper = shallowSetup({ signature: "Signature" })
    expect(wrapper).toBeTruthy();



})

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

it("should handle sign document", () => {

    const onClickMock = jest.fn()

    const wrapper = shallowSetup({ signature: "Signature" })

    let result = onClickMock("e");

    const signDocument = wrapper.find("button")
    signDocument.simulate('click')



    expect(result).toBeUndefined();
    expect(onClickMock.mock.calls.length).toEqual(1);

})

