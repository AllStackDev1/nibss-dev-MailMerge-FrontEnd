import React from 'react';
import { shallow, mount } from 'enzyme';
import SignDocument from "../components/Dashboard/modals/SignDocument"



const shallowSetup = (props = {}) => {

    return shallow(<SignDocument />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toBeTruthy();
})

it("handle SignDocument click", () => {

    const onClickMock = jest.fn();

    const wrapper = mount(
        <SignDocument onClick={onClickMock} />
    )

    let result = onClickMock("e");

    const signDocument = wrapper.find(".width-50-percent")
    signDocument.simulate('click', { stopPropagation: () => { } })

    expect(result).toBeUndefined();
    expect(onClickMock.mock.calls.length).toEqual(1);

})
