import React from 'react';
import { mount } from 'enzyme';
import User from "../components/Dashboard/snippets/User"


const shallowSetup = (props = {}) => {

    return mount(
        <User {...props} />
    )
}

it("should render properly", () => {

    const wrapper = shallowSetup({ user: { _id: "123" } });
    expect(wrapper).toMatchSnapshot();

})


it("should click edit recipients", () => {

    const clicker = jest.fn();
    const wrapper = shallowSetup({ setModal: jest.fn(), setUser: jest.fn(), user: { _id: "123" } })
    const divElem = wrapper.find("[data-click='test-component']")

    let result = clicker();

    divElem.simulate("click")
    expect(result).toBeUndefined();
    expect(clicker.mock.calls.length).toEqual(1);
})

it("should click update role", () => {

    const clicker = jest.fn();
    const wrapper = shallowSetup({ updateRole: jest.fn(), user: { _id: "123" }, localUserRole: { data: { role: "administrator" } } })
    const divElem = wrapper.find("[data-test='update-role']")

    let result = clicker();

    divElem.simulate("click")
    expect(result).toBeUndefined();
    expect(clicker.mock.calls.length).toEqual(1);

})

it("should click delete user", () => {

    const clicker = jest.fn();
    const wrapper = shallowSetup({ deleteUser: jest.fn(), setModal: jest.fn(), user: { _id: "123" }, localUserRole: { data: { role: "administrator" } } })
    const divElem = wrapper.find("[data-test='delete-user']").at(0)

    let result = clicker();

    divElem.simulate("click")
    expect(result).toBeUndefined();
    expect(clicker.mock.calls.length).toEqual(1);

})