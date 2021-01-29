import React from 'react';
import { mount } from 'enzyme';
import DocumentInstance from "../components/Dashboard/DocumentInstance"
import { useSelector, Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/documentReducer';
import { act } from "@testing-library/react"


jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ documentId: 123 }),
}))


const shallowSetup = (props = {}) => {

    const store = createStore(reducer, { documents: "123" });


    return mount(
        <Provider store={store} {...props}>
            <DocumentInstance />
        </Provider>
    )
}

it("render component without error", () => {

    jest.mock("react-redux", () => ({
        ...jest.requireActual("react-redux"),
        useSelector: jest.fn()
    }));

    useSelector.mockImplementation(callback => {
        return callback({ documents: { fetching: false } });
    });

    const wrapper = shallowSetup();
    expect(wrapper).toBeTruthy();
})

it("should have a snapshot without error", () => {

    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();

})

it("should click back button", () => {

    const clicker = jest.fn();

    const wrapper = shallowSetup();
    const backBtn = wrapper.find("[data-test='backbtn']").at(0)

    let result = clicker()

    backBtn.simulate("click")
    expect(clicker.mock.calls.length).toBe(1)
})

it("should click on the next tab 2", () => {

    const wrapper = shallowSetup();

    const docTab = wrapper.find("DocumentTab").at(1)
    act(() => {
        docTab.prop("setTab")(2)
    })
    wrapper.update()

    expect(wrapper.find("DocumentTab").at(1).prop("setTab")).toBeTruthy()

})

it("should click on the next tab 3", () => {

    const wrapper = shallowSetup();

    const docTab = wrapper.find("DocumentTab").at(2)
    act(() => {
        docTab.prop("setTab")(3)
    })
    wrapper.update()

    expect(wrapper.find("DocumentTab").at(2).prop("setTab")).toBeTruthy()

})