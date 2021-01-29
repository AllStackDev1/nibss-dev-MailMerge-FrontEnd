import React from 'react';
import { shallow } from 'enzyme';
import Invite from "../components/onboarding/steps/snippets/invite"



const shallowSetup = (props = {}) => {

    return shallow(<Invite {...props} />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

it("should handle image click", () => {

    const onClickMock = jest.fn()
    const setInvitedMock = jest.fn(e => jest.fn())

    const wrapper = shallowSetup({ setInvited: setInvitedMock })

    let result = onClickMock("e");

    const img = wrapper.find("img")
    img.simulate('click')



    expect(result).toBeUndefined();
    expect(onClickMock.mock.calls.length).toEqual(1);

})

