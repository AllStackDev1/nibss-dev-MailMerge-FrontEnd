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

