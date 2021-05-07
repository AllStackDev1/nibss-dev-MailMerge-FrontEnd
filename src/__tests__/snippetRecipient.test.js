import React from 'react';
import { mount } from 'enzyme';
import Recipient from "../components/Dashboard/snippets/Recipient"


const shallowSetup = (props = {}) => {

    return mount(
        <Recipient {...props} />
    )
}

it("should render properly", () => {

    const wrapper = shallowSetup({ recipient: { _id: "123", tag: ["tag"] } });
    expect(wrapper).toMatchSnapshot();

})


it("should click edit recipients", () => {

    const clicker = jest.fn();
    const wrapper = shallowSetup({ setModal: jest.fn(), setEditRecipient: jest.fn(), recipient: { _id: "123", tag: ["tag"] }, localUserRole: { data: { role: "administrator" } } })
    const divElem = wrapper.find("[data-testid='edit-recipient']")

    let result = clicker();

    divElem.simulate("click")
    expect(result).toBeUndefined();
    expect(clicker.mock.calls.length).toEqual(1);
})

it("should click initiate edit", () => {

    const clicker = jest.fn();
    const wrapper = shallowSetup({ initiateEdit: jest.fn(), recipient: { _id: "123", tag: ["tag"] }, localUserRole: { data: { role: "administrator" } } })
    const divElem = wrapper.find("[data-testid='initiate-edit']")

    let result = clicker();

    divElem.simulate("click")
    expect(result).toBeUndefined();
    expect(clicker.mock.calls.length).toEqual(1);

})

it("should click delete recipient", () => {

    const clicker = jest.fn();
    const wrapper = shallowSetup({ deleteRecipient: jest.fn(), recipient: { _id: "123", tag: ["tag"] }, localUserRole: { data: { role: "administrator" } } })
    const divElem = wrapper.find("[data-testid='delete-recipient']").at(0)

    let result = clicker();

    divElem.simulate("click")
    expect(result).toBeUndefined();
    expect(clicker.mock.calls.length).toEqual(1);

})