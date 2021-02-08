import React from 'react';
import { shallow, mount } from 'enzyme';
import InviteUsers from "../components/onboarding/steps/inviteUsers"
import { createStore } from 'redux';
import reducer from '../reducers/userReducer';
import { useSelector, Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';



/**
 * 
 * @param {objects} props 
 * @returns {ShallowWrapper}
 */

const shallowSetup = (props = {}) => {
    jest.mock("react-redux", () => ({
        ...jest.requireActual("react-redux"),
        useSelector: jest.fn()
    }));

    const store = createStore(reducer, { user: { invitingUsers: false } });

    return mount(
        <Provider store={store}>
            <BrowserRouter>
                <InviteUsers />
            </BrowserRouter>
        </Provider>
    )

}


describe("component renders", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({ user: { invitingUsers: true } });
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


it("should handle invite form with checkbox", () => {

    const wrapper = shallow(<InviteUsers />)
    const inviteFormElem = wrapper.find("InviteForm");

    inviteFormElem.simulate("change", { target: { name: "name", value: "value", checked: true, type: "checkbox" } })
    expect(inviteFormElem).toBeTruthy();

})

it("should handle invite form without checkbox", () => {

    const wrapper = shallow(<InviteUsers />)
    const inviteFormElem = wrapper.find("InviteForm");

    inviteFormElem.simulate("change", { target: { name: "name", value: "value", checked: true, type: "type" } })
    expect(inviteFormElem).toBeTruthy();

})

it("should handle add invite", () => {

    const wrapper = shallow(<InviteUsers />)
    const inviteFormElem = wrapper.find("InviteForm");

    inviteFormElem.prop("addInvite")({ preventDefault: jest.fn() })
    expect(inviteFormElem.prop("addInvite")).toBeTruthy();

})

it("should click save button", () => {

    const wrapper = shallowSetup(<InviteUsers add={true} />)
    const saveBtn = wrapper.find("[data-test='save-btn']");

    saveBtn.prop("onClick")()
    expect(saveBtn.prop("onClick")).toBeTruthy()

})


