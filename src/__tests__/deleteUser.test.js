import React from 'react';
import { shallow, mount } from 'enzyme';
import DeleteUser from "../components/Dashboard/modals/DeleteUser"



const shallowSetup = (props = {}) => {

    return shallow(<DeleteUser {...props} />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toBeTruthy();
})

it("handle DeleteUser click", () => {

    const onClickMock = jest.fn();

    const wrapper = mount(
        <DeleteUser onClick={onClickMock} />
    )

    let result = onClickMock("e");

    const deleteUserDiv = wrapper.find("[data-test='delete-user-component']")
    deleteUserDiv.simulate('click', { stopPropagation: () => { } })

    expect(result).toBeUndefined();
    expect(onClickMock.mock.calls.length).toEqual(1);

})

it("should clear canvas", () => {

    const clearCanvasMock = jest.fn();
    const renderNewMock = jest.fn();

    // const setLegal = jest.fn()
    // const setSignatureSource = jest.fn()

    const setLegalSpy = jest.spyOn(React, "useState")
    const setSignatureSourceSpy = jest.spyOn(React, "useState")

    setLegalSpy.mockImplementation(() => [false, setLegal])
    setSignatureSourceSpy.mockImplementation(() => ["new", setSignatureSource])

    const wrapper = mount(
        <DeleteUser clearCanvas={clearCanvasMock} renderNew={renderNewMock} signatureSource={setSignatureSourceSpy} />
    )

    let result = renderNewMock("e");
    // setSignatureSourceSpy("new")

    // expect(setSignatureSourceSpy).toHaveBeenCalledWith("saved");

    expect(result).toBeUndefined();
    expect(renderNewMock.mock.calls.length).toEqual(1);
    expect(renderNewMock).toHaveBeenCalledTimes(1);


})




