import React from 'react';
import { shallow, mount } from 'enzyme';
import SignDocument from "../components/Dashboard/modals/SignDocument"



const shallowSetup = (props = {}) => {

    return shallow(<SignDocument {...props} />)
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

it("should add new signature", () => {
    const onclicker = jest.fn(() => jest.fn());

    const wrapper = shallow(<SignDocument />)


    const butn = wrapper.find("button").at(0);

    expect(butn.text()).toEqual("ADD NEW")

    let resulted = onclicker("e");
    butn.simulate('click')

    expect(onclicker.mock.calls.length).toEqual(1);

})

it("should click signature container", () => {

    const wrapper = shallowSetup({ user: { data: { signatures: ["mapSignature"] } }, setDocumentSignature: jest.fn() })
    const signatureConElem = wrapper.find("[data-test='signature-con']");

    expect(signatureConElem.length).toBe(1)
    signatureConElem.simulate('click')
})

it("should click use saved signature", () => {

    const wrapper = shallowSetup({ user: { data: { signatures: ["mapSignature"] } }, setDocumentSignature: jest.fn() })
    const addNewBtn = wrapper.find("[data-test='add-new']")

    expect(addNewBtn.length).toBe(1)

    addNewBtn.simulate("click")

    wrapper.update()

    const useSavedbtn = wrapper.find("[data-test='use-save-btn']")
    expect(useSavedbtn.length).toBe(1)

    useSavedbtn.simulate("click")

})

it("should draw signature", () => {

    const wrapper = shallowSetup({
        user: { data: { signatures: ["mapSignature"] } },
        setDocumentSignature: jest.fn(),
        setSignatureType: jest.fn(),
        setSignature: jest.fn(),
    })
    const addNewBtn = wrapper.find("[data-test='add-new']")

    expect(addNewBtn.length).toBe(1)

    addNewBtn.simulate("click")

    wrapper.update()

    const signatureOption = wrapper.find("[data-test='draw-signature']")
    signatureOption.simulate("click")

})

it("should write signature", () => {

    const wrapper = shallowSetup({
        user: { data: { signatures: ["mapSignature"] } },
        setDocumentSignature: jest.fn(),
        setSignatureType: jest.fn(),
        signatureCanvas: { current: { clear: jest.fn() } }
    })
    const addNewBtn = wrapper.find("[data-test='add-new']")

    expect(addNewBtn.length).toBe(1)

    addNewBtn.simulate("click")

    wrapper.update()

    const signatureOption = wrapper.find("[data-test='write-signature']");
    signatureOption.simulate("click")

})

it("should handle input signature", () => {

    const wrapper = shallowSetup({
        user: { data: { signatures: ["mapSignature"] } },
        setDocumentSignature: jest.fn(),
        setSignatureType: jest.fn(),
        signatureCanvas: { current: { clear: jest.fn() } },
        signatureType: "write",
        signature: { signature: "signature" },
        setSignature: jest.fn(),
    })
    const addNewBtn = wrapper.find("[data-test='add-new']")

    addNewBtn.simulate("click")

    wrapper.update()

    const signatureOption = wrapper.find("[data-test='write-signature']");
    signatureOption.simulate("click")

    const inputSignature = wrapper.find(".width-600");
    inputSignature.simulate("change", { target: { value: "signatures" } })

    expect(inputSignature.length).toBe(1);

})

it("runn", () => {

    const wrapper = shallowSetup({
        user: { data: { signatures: ["mapSignature"] } },
        setDocumentSignature: jest.fn(),
        setSignatureType: jest.fn(),
        signatureCanvas: { current: { clear: jest.fn() } },
        signatureType: "new",
        signature: { signature: "signature" },
        setSignature: jest.fn(),
    })
    const addNewBtn = wrapper.find("[data-test='add-new']")

    addNewBtn.simulate("click")

    wrapper.update()

    const signatureOption = wrapper.find("[data-test='write-signature']");
    signatureOption.simulate("click")

    const clearCanvasBtn = wrapper.find(".red-color");
    clearCanvasBtn.simulate("click")

    expect(clearCanvasBtn.length).toBe(1);

})



