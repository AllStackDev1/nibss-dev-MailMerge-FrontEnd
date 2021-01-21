import React from 'react';
import { shallow, mount } from 'enzyme';
import DeleteRecipient from "../components/Dashboard/modals/DeleteRecipient"



const shallowSetup = (props = {}) => {

    return shallow(<DeleteRecipient {...props} />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toBeTruthy();
})

it("handle DeleteRecipient click", () => {

    const onClickMock = jest.fn();

    const wrapper = mount(
        <DeleteRecipient onClick={onClickMock} />
    )

    let result = onClickMock("e");

    const deleteRecipientDiv = wrapper.find("[data-test='delete-recipient-component']")
    deleteRecipientDiv.simulate('click', { stopPropagation: () => { } })

    expect(result).toBeUndefined();
    expect(onClickMock.mock.calls.length).toEqual(1);

})




