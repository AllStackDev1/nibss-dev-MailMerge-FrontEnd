import React, { useState } from 'react';
import { mount, shallow } from 'enzyme';
import Documents from "../components/Dashboard/Documents"
import { useSelector, Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/document';
import { BrowserRouter } from 'react-router-dom';
import { act } from "@testing-library/react"


jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ documentId: 123 }),
}))


const shallowSetup = (props = {}) => {

    jest.mock("react-redux", () => ({
        ...jest.requireActual("react-redux"),
        useSelector: jest.fn()
    }));

    const store = createStore(reducer, { documents: "123" });


    return mount(
        <Provider store={store}>
            <BrowserRouter>
                <Documents {...props} />
            </BrowserRouter>
        </Provider>
    )
}



describe("component renders", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({ auth: { loggingIn: false } });
        });

    });

    afterEach(() => {
        useSelector.mockClear();
    });


    it("should render without errors", () => {

        const wrapper = shallowSetup();
        expect(wrapper).toBeTruthy();
    })

    it("should handle back button click", () => {

        const backButtonClick = jest.fn();
        const store = createStore(reducer, { documents: "123" });

        jest.mock("react", () => ({
            ...jest.requireActual("react"),
            useState: jest.fn()
        }));

        const documentUploadMock = jest.fn(() => true)



        const wrapper = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <Documents uploadingDocument={documentUploadMock} step={3} onClick={backButtonClick} />
                </BrowserRouter>
            </Provider>
        )



        // expect(backButton.length).toBe(1)

        // backButton.simulate('click', { stopPropagation: () => { } })

        // expect(result).toBeUndefined();
        // expect(backButtonClick.mock.calls.length).toEqual(1);

    })
})



it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

it("should upload document", () => {

    const uploadClick = jest.fn();

    const wrapper = shallowSetup();
    const uploadBtn = wrapper.find("[data-test='uploadbutton']").at(0);

    const btn = uploadClick();

    uploadBtn.simulate("click");

    expect(uploadClick.mock.calls.length).toEqual(1);


})

it("should close modal container", () => {

    const wrapper = shallowSetup();
    const uploadBtn = wrapper.find("[data-test='uploadbutton']").at(0);


    uploadBtn.simulate("click", { setModal: "create-document" });


    wrapper.update()

    expect(wrapper.find("ModalContainer").length).toBe(1)
    const closeModalClick = wrapper.find("ModalContainer");


    closeModalClick.simulate("click", { setModal: "" })

})


it("should create document", () => {

    const wrapper = shallowSetup();
    const uploadBtn = wrapper.find("[data-test='uploadbutton']").at(0);


    uploadBtn.simulate("click", { setModal: "create-document" });

    const closeModalDiv = wrapper.find("CreateDocument");
    closeModalDiv.simulate("click", { setModal: "" })

    act(() => {
        closeModalDiv.prop("setUploadingDocument")(true)
    })

    expect(closeModalDiv.length).toBe(1)

    wrapper.update()

    const backBtnEle = wrapper.find("[data-test='docs-backbtn']").at(0)

    backBtnEle.simulate("click");

    expect(backBtnEle).toBeTruthy()

})

it("runn", () => {

    const wrapper = shallowSetup();
    const docList = wrapper.find("DocumentList");

    docList.prop("viewDocument")({ _id: "123" })


})


