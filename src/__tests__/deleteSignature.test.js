import React from 'react';
import { shallow, mount } from 'enzyme';
import DeleteSignature from "../components/Dashboard/modals/DeleteSignature"



const shallowSetup = (props = {}) => {

    return shallow(<DeleteSignature {...props} />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toBeTruthy();
})

it("handle DeleteSignature click", () => {

    const onClickMock = jest.fn();

    const wrapper = mount(
        <DeleteSignature onClick={onClickMock} />
    )

    let result = onClickMock("e");

    const deleteSignatureDiv = wrapper.find("[data-test='delete-signature-component']")
    deleteSignatureDiv.simulate('click', { stopPropagation: () => { } })

    expect(result).toBeUndefined();
    expect(onClickMock.mock.calls.length).toEqual(1);

})




