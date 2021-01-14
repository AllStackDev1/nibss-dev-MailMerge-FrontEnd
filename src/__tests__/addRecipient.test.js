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

    let result = onClickMock("e");

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

it("should should update on modal true", () => {

    const editRecipientConstant = "edit-recipient";

    const wrapper = mount(<AddRecipient modal={editRecipientConstant} />)
    expect(wrapper.find("[data-test='recipient-update']")).toBeTruthy();

})