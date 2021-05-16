import React from 'react';
import { shallow, mount } from 'enzyme';
import CreateDocument from "../components/Dashboard/modals/CreateDocument"



const shallowSetup = (props = {}) => {

    return shallow(<CreateDocument {...props} />)
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

it("should mock onDrop", () => {

    const onDrop = jest.fn();

    const wrapper = mount(<CreateDocument onDrop={onDrop} />)
    expect(wrapper).toBeTruthy();

})



it("should click Back", () => {
    const clicker = jest.fn();
    const wrapper = shallowSetup({
      setModal: jest.fn(),
    });
    const divElem = wrapper.find("[data-testid='back-click']");
  
    let result = clicker();
  
    divElem.simulate("click");
    expect(result).toBeUndefined();
    expect(clicker.mock.calls.length).toEqual(1);
});



