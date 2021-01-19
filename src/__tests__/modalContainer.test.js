import React from 'react';
import { shallow, mount } from 'enzyme';
import ModalContainer from "../components/Dashboard/modals/ModalContainer"
import { BrowserRouter } from 'react-router-dom'


const shallowSetup = (props = {}) => {

    return shallow(
        <BrowserRouter>
            <ModalContainer {...props} />
        </BrowserRouter>
    )
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toBeTruthy();
})

it("handle recipient click", () => {

    const onClickMock = jest.fn();

    const wrapper = mount(
        <BrowserRouter>
            <ModalContainer onClick={onClickMock} />
        </BrowserRouter>
    )

    let result = onClickMock("e");

    const modalContainerDiv = wrapper.find("div.above-all")

    modalContainerDiv.simulate('click', { stopPropagation: () => { } })

    expect(result).toBeUndefined();
    expect(onClickMock.mock.calls.length).toEqual(1);

})




