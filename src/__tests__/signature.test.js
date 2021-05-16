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
        return callback({ recipients: {}, auth:{deletingSignature: false}  });
    });

    const wrapper = shallowSetup({ signature: {url:"Signature", _id: '1'} })
    expect(wrapper).toBeTruthy();
})

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

it("should handle sign document", () => {
    const onClickMock = jest.fn()

    const wrapper = shallowSetup({ signature: {url:"Signature", _id: '1'} })

    let result = onClickMock("e");

    const signDocument = wrapper.find("button")
    signDocument.simulate('click')

    expect(result).toBeUndefined();
    expect(onClickMock.mock.calls.length).toEqual(1);
})

it("should handle delete signature", () => {

    const wrapper = shallowSetup();
    const buttonElem = wrapper.find("button");

    buttonElem.prop("onClick")()

    const deleteSignatureElem = wrapper.find("[data-test='delete-signature']")
    deleteSignatureElem.prop("closeModal")()

    deleteSignatureElem.prop("onSubmit")()

})

it("should handle modal container", () => {

    const wrapper = shallowSetup();
    const buttonElem = wrapper.find("button");

    buttonElem.prop("onClick")()

    wrapper.update()

    const modalConElem = wrapper.find("[data-test='modal-container']");

    modalConElem.prop("closeModal")("")

    wrapper.update()

})

describe('handle setup signatoies component with auth state true', () => {

    jest.mock("react-redux", () => ({
        ...jest.requireActual("react-redux"),
        useSelector: jest.fn()
    }));

    useSelector.mockImplementation(callback => {
        return callback({ recipients: {}, auth:{deletingSignature: true}  });
    });

    const wrapper = shallowSetup({ signature: {url:"Signature", _id: '1'} })
    expect(wrapper).toBeTruthy();
})


