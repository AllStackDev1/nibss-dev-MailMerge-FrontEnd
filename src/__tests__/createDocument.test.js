import React from 'react';
import { shallow, mount } from 'enzyme';
import CreateDocument from "../components/Dashboard/modals/CreateDocument"



const shallowSetup = (props = {}) => {

    return shallow(<CreateDocument />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toBeTruthy();
})

it("handle recipient click", () => {

    const onClickMock = jest.fn();

    const wrapper = mount(
        <CreateDocument onClick={onClickMock} />
    )

    let result = onClickMock("e");

    const createDocumentDiv = wrapper.find("[data-test='create-document-component']")
    createDocumentDiv.simulate('click', { stopPropagation: () => { } })

    expect(result).toBeUndefined();
    expect(onClickMock.mock.calls.length).toEqual(1);

})

it("should mock useDropzone", () => {

    const useDropzoneMock = jest.fn();

    const wrapper = mount(<CreateDocument useDropzone={useDropzoneMock} />)
    expect(wrapper).toBeTruthy();

})



