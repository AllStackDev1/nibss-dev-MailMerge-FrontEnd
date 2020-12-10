import React from 'react';
import { mount, shallow } from 'enzyme';
import Login from "../components/auth/login"
import { Provider } from "react-redux";
import { createStore } from 'redux';
import reducer from '../reducers/authReducer';
import { useSelector } from 'react-redux';



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

    const store = createStore(reducer, { auth: { loggingIn: false } });

    const wrapper = mount(
        <Provider store={store}>
            <Login />
        </Provider>
    )

    return wrapper;
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

    it('should render login component successfully', () => {
        const wrapper = shallowSetup()
        expect(wrapper.find("[data-test='component-login']").length).toBe(1)
    })
})

test('check for email field', () => {

    const wrapper = shallowSetup();
    expect(wrapper.find('[type="email"]').length).toBe(1)

})

test('check for password field', () => {
    const wrapper = shallowSetup();
    expect(wrapper.find('[type="password"]').length).toBe(1)
})

describe('if users enter a wrong login details', () => {
    it('should display wrong password message', () => {

    })
})

describe('if users enter the right login details', () => {
    it('should display success message', () => {

    })
})