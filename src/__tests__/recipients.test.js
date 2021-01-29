import React from 'react';
import { mount } from 'enzyme';
import Recipients from "../components/Dashboard/Recipients"
import { useSelector, Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/recipientReducer';
import { BrowserRouter } from 'react-router-dom';
import { act } from "@testing-library/react"


jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ pageId: "123" }),
}))


const shallowSetup = (props = {}, state) => {

    jest.mock("react-redux", () => ({
        ...jest.requireActual("react-redux"),
        useSelector: jest.fn()
    }));

    const store = createStore(reducer, { recipients: {} });

    if (state) {
        <Recipients {...state} />
    }



    return mount(
        <Provider store={store}>
            <BrowserRouter>
                <Recipients />
            </BrowserRouter>
        </Provider>
    )
}



describe("component renders", () => {



    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({ recipients: {} });
        });

    });

    afterEach(() => {
        useSelector.mockClear();
    });




    it("should render without errors", () => {
        const store = createStore(reducer, { recipients: {} });

        const wrapper = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <Recipients />
                </BrowserRouter>
            </Provider>)

        expect(wrapper).toBeTruthy();
    })
})



it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

it("should set modal on toolbox", () => {

    const wrapper = shallowSetup()
    const toolboxEle = wrapper.find("Toolbox");
    act(() => {
        toolboxEle.prop("setModal")("add-recipient")
    })

    wrapper.update()

    const modalCont = wrapper.find("ModalContainer");
    modalCont.simulate("click", { setModal: "" })

    act(() => {
        expect(wrapper.find("Toolbox").length).toBe(1)
    })


    act(() => {
        toolboxEle.prop("closeTags")()
    })
    expect(toolboxEle.prop("closeTags")).toBeTruthy()

    act(() => {
        toolboxEle.prop("onChange")({ target: { name: "name", value: "1234" } })
    })
    expect(toolboxEle.prop("onChange")).toBeTruthy()

    act(() => {
        toolboxEle.prop("addFilter")()
        toolboxEle.prop("removeFilter")()
    })


})

it("should handle view tags", () => {

    const wrapper = shallowSetup()
    const viewTagEle = wrapper.find("ViewTag")

    act(() => {
        viewTagEle.prop("deleteTag")("tag")
    })
    expect(viewTagEle.prop("deleteTag")).toBeTruthy()

    act(() => {
        viewTagEle.prop("addTagsToRecipient")()
    })
    expect(viewTagEle.prop("addTagsToRecipient")).toBeTruthy()

})

it("should handle recipient list", () => {

    const wrapper = shallowSetup()
    const recipientListEle = wrapper.find("RecipientList")

    act(() => {
        recipientListEle.prop("initiateEdit")("id123")
        recipientListEle.prop("initiateDeleteRecipient")("id123")
    })

})







