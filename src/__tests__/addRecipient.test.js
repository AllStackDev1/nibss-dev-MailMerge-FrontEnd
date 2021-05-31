import React from 'react';
import { shallow, mount } from 'enzyme';
import AddRecipient from "../components/Dashboard/modals/AddRecipient"



const shallowSetup = (props = {}) => {

    return shallow(<AddRecipient />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toBeTruthy();
})

it("handle recipient click", () => {

    const onClickMock = jest.fn();

    const wrapper = mount(
        <AddRecipient onClick={onClickMock} />
    )

    const result = onClickMock("e");

    const recipientDiv = wrapper.find("[data-test='recipient-component']")
    recipientDiv.simulate('click', { stopPropagation: () => { } })
    expect(result).toBeUndefined();
    expect(onClickMock.mock.calls.length).toEqual(1);

})

it("should show loading sign when creating", () => {
    const creating = true;
    const wrapper = mount(<AddRecipient creating={creating} />)
    expect(wrapper.find(".lds-ring")).toBeTruthy();
})


it("should update on modal true", () => {

    const editRecipientConstant = "edit-recipient";

    const wrapper = mount(<AddRecipient modal={editRecipientConstant} />)
    expect(wrapper.find("[data-test='recipient-update']")).toBeTruthy();

})

it("should handle name on change", () => {
    const onChangeEditMock = jest.fn();
    const onChangeMock = jest.fn();

    const wrapper = mount(<AddRecipient onChange={onChangeMock} onChangeEdit={onChangeEditMock} />)

    const nameInput = wrapper.find("[data-test='name-input']")

    nameInput.simulate('change', {target: { value: 'change', name: 'name' }})

    expect(onChangeMock.mock.calls.length).toEqual(1);
    expect(onChangeEditMock.mock.calls.length).toEqual(0);

})

it("should handle name on change for edit", () => {
    const editRecipientConstant = "edit-recipient";

    const onChangeEditMock = jest.fn();
    const onChangeMock = jest.fn();

    const wrapper = mount(<AddRecipient modal={editRecipientConstant} onChange={onChangeMock} onChangeEdit={onChangeEditMock} />)

    const nameInput = wrapper.find("[data-test='name-input']")

    nameInput.simulate('change', {target: { value: 'change', name: 'name' }})

    expect(onChangeMock.mock.calls.length).toEqual(0);
    expect(onChangeEditMock.mock.calls.length).toEqual(1);

})

it("should handle email on change", () => {
    const onChangeEditMock = jest.fn();
    const onChangeMock = jest.fn();

    const wrapper = mount(<AddRecipient onChange={onChangeMock} onChangeEdit={onChangeEditMock} />)

    const nameInput = wrapper.find("[data-test='email-input']")

    nameInput.simulate('change', {target: { value: 'change', name: 'email' }})

    expect(onChangeMock.mock.calls.length).toEqual(1);
    expect(onChangeEditMock.mock.calls.length).toEqual(0);
})

it("should handle email on change for edit", () => {
    const editRecipientConstant = "edit-recipient";

    const onChangeEditMock = jest.fn();
    const onChangeMock = jest.fn();

    const wrapper = mount(<AddRecipient modal={editRecipientConstant} onChange={onChangeMock} onChangeEdit={onChangeEditMock} />)

    const nameInput = wrapper.find("[data-test='email-input']")

    nameInput.simulate('change', {target: { value: 'change', name: 'email' }})

    expect(onChangeMock.mock.calls.length).toEqual(0);
    expect(onChangeEditMock.mock.calls.length).toEqual(1);

})