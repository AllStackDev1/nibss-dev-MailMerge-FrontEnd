import React from 'react';
import { mount } from 'enzyme';
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

