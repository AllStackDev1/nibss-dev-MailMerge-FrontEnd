import React from 'react';
import { mount, shallow } from 'enzyme';
import InviteForm from "../components/onboarding/steps/snippets/inviteForm"

const shallowSetup = (props = {}) => {
    return mount(<InviteForm {...props} />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

it("should handle select field", () => {

    const onClickMock = jest.fn(() => jest.fn())

    const wrapper = shallow(<InviteForm setRole={onClickMock} />)


    const selectEle = wrapper.find("select")

    selectEle.prop("onChange")({ value: "123" })
    expect(onClickMock.mock.calls.length).toEqual(1)
})

it("should handle upload-csv-button", () => {
    const uploadClick = jest.fn();
    const wrapper = shallowSetup({});

    const uploadBtn = wrapper.find("[data-test='upload-csv-button']")

    const btn = uploadClick();
    uploadBtn.simulate("click");
    expect(uploadClick.mock.calls.length).toEqual(1);
})

describe('Email Validation', () => {
    let formWrapper;
    beforeEach(() => {
        formWrapper =  shallow(<InviteForm />)
    });
    
    it('calls fail email validation', () => {
        let emailInput = formWrapper.find("[data-test='email-input']")
        emailInput.simulate('blur', { target: { value: 'test@ex', name: 'email' } })
        emailInput = formWrapper.find("[data-test='email-input']")
        const errorText = formWrapper.find("[data-test='error-text']")
        let containerStyle = emailInput.get(0).props.style;
        expect(containerStyle).toHaveProperty('borderColor', '#f82e2e');
        expect(errorText.text()).toEqual('Provide a valid email');
    });

    it('calls pass email validation', () => {
        let emailInput = formWrapper.find("[data-test='email-input']")
        emailInput.simulate('blur', { target: { value: 'test@example.com', name: 'email' } })
        emailInput = formWrapper.find("[data-test='email-input']")
        const errorText = formWrapper.find("[data-test='error-text']")
        let containerStyle = emailInput.get(0).props.style;
        expect(containerStyle).toHaveProperty('borderColor', '');
        expect(errorText.exists()).toBeFalsy();
    });
  });

  it('calls parse CSV', () => {
    const wrapper = shallowSetup({});
    const fileContents = 'contents 1,contents 2,contents 3';
    const file = new File([fileContents], { type: 'text/csv;charset=utf-8;' });
    const readAsText = jest.fn();
    const dummyFileReader = {readAsText, result: fileContents};
    window.FileReader = jest.fn(() => dummyFileReader);
    wrapper.find("[data-test='upload-csv-input']").simulate('change', {target: {files: [file]}});
    expect(FileReader).toHaveBeenCalled();
    expect(readAsText).toHaveBeenCalled()
});

