import React, { useState } from 'react';
import { mount, shallow } from 'enzyme';
import Documents from "../components/Dashboard/Documents"
import { useSelector, Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/documentReducer';
import { BrowserRouter } from 'react-router-dom';


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

it("should ", () => {

    const wrapper = shallowSetup();
    expect(wrapper.find(".width-85-percent").length).toBe(1)

})

