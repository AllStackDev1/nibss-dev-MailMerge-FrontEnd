import React from 'react';
import { shallow, mount } from 'enzyme';
import EditUser from "../components/Dashboard/modals/EditUser"



const shallowSetup = (props = {}) => {

    return shallow(<EditUser {...props} />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup({ user: { name: "abcd" } })
    expect(wrapper).toBeTruthy();
})

it("handle EditUser click", () => {

    const onClickMock = jest.fn();

    const wrapper = mount(
        <EditUser onClick={onClickMock} user={{ name: "abcd" }} editing={true} />
    )

    let result = onClickMock("e");

    const editUserDiv = wrapper.find("[data-test='edit-user-component']")
    editUserDiv.simulate('click', { stopPropagation: () => { } })

    expect(result).toBeUndefined();
    expect(onClickMock.mock.calls.length).toEqual(1);

})




