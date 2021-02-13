import React, { useState } from 'react';
import { mount } from 'enzyme';
import Users from "../components/Dashboard/Users"
import { useSelector, Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/user';
import { BrowserRouter } from 'react-router-dom';
import UserList from "../components/Dashboard/snippets/UserList"
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

    const store = createStore(reducer, { user: {} });

    if (state) {
        <Recipients {...state} />
    }

    return mount(
        <Provider store={store}>
            <BrowserRouter>
                <Users {...props} />
            </BrowserRouter>
        </Provider>
    )
}



describe("component renders", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({ users: {} });
        });

    });

    afterEach(() => {
        useSelector.mockClear();
    });



    it("should render without errors", () => {

        const wrapper = shallowSetup();
        expect(wrapper).toBeTruthy();
    })
})



it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

it("runnn", () => {

    const wrapper = shallowSetup({ user: { _id: "123" } });
    const modalCont = wrapper.setProps({
        children:
            (
                <BrowserRouter>
                    <UserList setModal={jest.fn()} />
                </BrowserRouter>
            )
    })

})

it("should render edit user modal", () => {
    const wrapper = shallowSetup();
    const userListEle = wrapper.find("UserList");

    act(() => {
        userListEle.prop("setModal")("edit-user")
    })
    expect(userListEle.prop("setModal")).toBeTruthy()
})

it("should render delete user modal", () => {
    const wrapper = shallowSetup();
    const userListEle = wrapper.find("UserList");

    act(() => {
        userListEle.prop("setModal")("delete-user")
    })
    expect(userListEle.prop("setModal")).toBeTruthy()
})

it("should initiate delete user modal", () => {

    const wrapper = shallowSetup();
    const userListEle = wrapper.find("UserList");

    act(() => {
        userListEle.prop("initiateDeleteUser")({ _id: "123" })
    })
    expect(userListEle.prop("initiateDeleteUser")).toBeTruthy()

})


it("should update role", () => {

    const wrapper = shallowSetup();
    const userListEle = wrapper.find("UserList");

    act(() => {
        userListEle.prop("updateRole")({ _id: "123" })
    })
    expect(userListEle.prop("updateRole")).toBeTruthy()

})

it("should handle close modal", () => {

    const wrapper = shallowSetup();
    const userListEle = wrapper.find("UserList");

    act(() => {
        userListEle.prop("setModal")("edit-user")
    })

    wrapper.update()

    const modalContainerDiv = wrapper.find("ModalContainer");

    modalContainerDiv.simulate("click")

})