import React from 'react';
import { shallow } from 'enzyme';
import Toolbox from "../components/Dashboard/snippets/Toolbox"



const shallowSetup = (props = {}) => {

    return shallow(<Toolbox {...props} />)
}


it("should click first active button", () => {

    const wrapper = shallowSetup({ tag: true, viewingTags: true, closeTags: jest.fn() })
    const activeBtn = wrapper.find("[data-test='active-btn1']");

    activeBtn.simulate('click')

    expect(activeBtn).toBeTruthy()

})

it("should click first active button false viewingTags", () => {

    const wrapper = shallowSetup({ tag: true, viewingTags: false, closeTags: jest.fn(), setViewingTags: jest.fn() })
    const activeBtn = wrapper.find("[data-test='active-btn1']");

    activeBtn.simulate('click')
    expect(activeBtn).toBeTruthy()

})

it("recipient button", () => {

    const wrapper = shallowSetup({ adding: true, downloading: true, setModal: jest.fn(), user: { data: { role: "administrator" } } });
    const recBtn = wrapper.find("RecipientButton");

    recBtn.simulate('click')

})

it("runn", () => {

    const wrapper = shallowSetup({ adding: true, downloading: true, setModal: jest.fn(), user: { data: { role: "administrator" } } });
    const recBtn = wrapper.find("RecipientButton");

    recBtn.simulate('click')

})