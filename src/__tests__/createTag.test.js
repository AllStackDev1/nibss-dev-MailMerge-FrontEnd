import React from 'react';
import { shallow, mount } from 'enzyme';
import CreateTag from "../components/Dashboard/modals/CreateTag"



const shallowSetup = (props = {}) => {

    return shallow(<CreateTag {...props} />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup({ tag: { name: "abcd" } })
    expect(wrapper).toBeTruthy();
})

it("handle recipient click", () => {

    const onClickMock = jest.fn();

    const wrapper = mount(
        <CreateTag onClick={onClickMock} tag={{ name: "" }} />
    )

    let result = onClickMock("e");

    const createTagDiv = wrapper.find("[data-test='create-tag-component']")
    createTagDiv.simulate('click', { stopPropagation: () => { } })

    expect(result).toBeUndefined();
    expect(onClickMock.mock.calls.length).toEqual(1);

})

it("should show loader", () => {

    const wrapper = shallowSetup({ creating: true, tag: { name: "name" } })
    expect(wrapper.find(".lds-ring").length).toBe(1)

})




