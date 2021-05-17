import React from 'react';
import { shallow } from 'enzyme';
import SaveSignature from "../components/onboarding/steps/saveSignature"
import { createStore } from 'redux';
import reducer from '../reducers/auth';
import { useSelector } from 'react-redux';

/**
 * 
 * @param {objects} props 
 * @returns {ShallowWrapper}
 */

const shallowSetup = (props = {}) => {
    jest.mock("react-redux", () => ({
        ...jest.requireActual("react-redux"),
        useSelector: jest.fn()
    }));

    return shallow(
        <SaveSignature />
    )

}


describe("component renders and uploading false ", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({ auth: { uploading: false } });
        });

    });

    afterEach(() => {
        useSelector.mockClear();
    });


    it('should render save signature component successfully', () => {
        const wrapper = shallowSetup()
        expect(wrapper).toBeTruthy();
    })

    it('should match snapshot', () => {
        const wrapper = shallowSetup()
        expect(wrapper).toMatchSnapshot();
    })

    it("Draw signature", () => {

        const onClickMock = jest.fn();
        const wrapper = shallowSetup();

        const signatureDiv = wrapper.find("SignatureOption").at(0);

        let result = onClickMock("e");

        signatureDiv.simulate('click', { stopPropagation: () => { } })

        expect(result).toBeUndefined();
        expect(onClickMock.mock.calls.length).toEqual(1);

    })

    it("Write signature", () => {
        const wrapper = shallowSetup(<SaveSignature />);

        const signatureDiv = wrapper.find("SignatureOption").at(1);

        signatureDiv.simulate('click')

        expect(signatureDiv.length).toBe(1);
    })

    it("Upload signature", () => {
        const wrapper = shallowSetup(<SaveSignature />);
        const signatureDiv = wrapper.find("SignatureOption").at(2);
        expect(signatureDiv.length).toBe(1);
        signatureDiv.simulate('click')
    })

    it("should clear canvas", () => {

        const onClickMock = jest.fn();
        const wrapper = shallowSetup(<SaveSignature />);

        const signatureDiv = wrapper.find(".red-color");


        expect(signatureDiv.length);


        let result = onClickMock("e");

        // signatureDiv.simulate('click', { stopPropagation: () => { } })

        expect(result).toBeUndefined();
        expect(onClickMock.mock.calls.length).toEqual(1);

    })

    it("should input signature", () => {

        const onChangeMock = jest.fn();
        const wrapper = shallowSetup(<SaveSignature />);

        const signatureInput = wrapper.find(".size-three-rem");

        expect(signatureInput.length).toBe(1);


        signatureInput.simulate('change', { target: { name: 'email_input', value: 'test@example.com' } })

        let result = onChangeMock("e");

        expect(result).toBeUndefined();

        expect(onChangeMock).toHaveBeenCalled();

    })

    it("should logout", () => {


        const onClickMock = jest.fn();
        const wrapper = shallowSetup(<SaveSignature />);

        const signatureDiv = wrapper.find(".mustard-color");

        expect(signatureDiv.length);


        let result = onClickMock("e");

        signatureDiv.simulate('click', { stopPropagation: () => { } })

        expect(result).toBeUndefined();
        expect(onClickMock.mock.calls.length).toEqual(1);

    })
})

describe("component renders and uploading true with progress ", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({ auth: { uploading: true, uploadProgress: 10  } });
        });

    });

    afterEach(() => {
        useSelector.mockClear();
    });


    it('should match snapshot', () => {
        const wrapper = shallowSetup()
        expect(wrapper).toMatchSnapshot();
    })

})

describe("component renders and uploading true ", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({ auth: { uploading: true  } });
        });

    });

    afterEach(() => {
        useSelector.mockClear();
    });


    it('should match snapshot', () => {
        const wrapper = shallowSetup()
        expect(wrapper).toMatchSnapshot();
    })

})

// it("save signature", () => {

//     const onClickMock = jest.fn();
//     const mockFun = spyOn("../components/onboarding/steps/saveSignature", "logout")
//     const wrapper = shallowSetup(<SaveSignature />);


//     mockFun.simulate('click', { stopPropagation: () => { } })

//     const signatureDiv = wrapper.find(".left-padding-30");

//     expect(signatureDiv.length);


//     let result = onClickMock("e");

//     signatureDiv.simulate('click', { stopPropagation: () => { } })

//     expect(result).toBeUndefined();
//     expect(onClickMock.mock.calls.length).toEqual(1);

// })
