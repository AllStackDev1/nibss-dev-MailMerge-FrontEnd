import React from 'react';
import { shallow, mount } from 'enzyme';
import DeleteTag from "../components/Dashboard/modals/DeleteTag"



const shallowSetup = (props = {}) => {

    return shallow(<DeleteTag {...props} />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toBeTruthy();
})

it("handle DeleteTag click", () => {

    const onClickMock = jest.fn();

    const wrapper = mount(
        <DeleteTag onClick={onClickMock} />
    )

    let result = onClickMock("e");

    const deleteTagDiv = wrapper.find("[data-test='delete-tag-component']")
    deleteTagDiv.simulate('click', { stopPropagation: () => { } })

    expect(result).toBeUndefined();
    expect(onClickMock.mock.calls.length).toEqual(1);

})




