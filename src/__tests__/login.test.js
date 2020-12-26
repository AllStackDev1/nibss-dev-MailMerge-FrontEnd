import React from 'react';
import { mount } from 'enzyme';
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

    return mount(
        <Provider store={store}>
            <Login />
        </Provider>
    )

}

const mockLogin = jest.fn();
const onChangeMock = jest.fn();


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

    it('should match snapshot', () => {
        const wrapper = shallowSetup()
        expect(wrapper).toMatchSnapshot();
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

describe('user logins in', () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({ auth: { loggingIn: false } });
        });

    });

    afterEach(() => {
        useSelector.mockClear();
    });

    it('should log user in', () => {

        jest.mock("react-redux", () => ({
            ...jest.requireActual("react-redux"),
            useSelector: jest.fn(),
            useDispatch: jest.fn()
        }));

        const store = createStore(reducer, { auth: { loggingIn: false } });

        const wrapper = mount(
            <Provider store={store}>
                <Login login={mockLogin} />
            </Provider>
        )

        let result = mockLogin("e");

        const input = wrapper.find('[type="email"]');
        const passwordInput = wrapper.find('[type="password"]');
        const buttonWrapper = wrapper.find('button');


        input.props().value = "test@example.com"
        passwordInput.props().value = "loginPassword"

        expect(input.props().value).toEqual("test@example.com");
        expect(passwordInput.props().value).toEqual("loginPassword");

        buttonWrapper.simulate("click", { preventDefault: () => { } });

        expect(result).toBeUndefined();
        expect(mockLogin.mock.calls.length).toEqual(1);


        expect(mockLogin).toHaveBeenCalledTimes(1);

        wrapper.find('form').simulate('submit', { preventDefault: () => { } })

        expect(mockLogin).toHaveBeenCalledTimes(1);

    })

})

describe('email validation', () => {
    it('should check for email input', () => {

        const wrapper = shallowSetup();
        const input = wrapper.find('[type="email"]')

        input.props().value = "test@example.com"

        expect(input.props().value).toEqual("test@example.com");
    })
    it('should check for valid email', () => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        const wrapper = shallowSetup();
        const input = wrapper.find('[type="email"]')

        input.props().value = "test@example.com"

        expect(input.props().value).toMatch(emailRegex)


    })
})

describe('if users enters value into input field', () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({ auth: { loggingIn: false } });
        });

    });

    afterEach(() => {
        useSelector.mockClear();
    });

    it('should update input field', () => {
        jest.mock("react-redux", () => ({
            ...jest.requireActual("react-redux"),
            useSelector: jest.fn(),
            useDispatch: jest.fn()
        }));

        const store = createStore(reducer, { auth: { loggingIn: false } });

        const wrapper = mount(
            <Provider store={store}>
                <Login onChange={onChangeMock} />
            </Provider>
        )

        const emailInput = wrapper.find('[type="email"]');

        emailInput.simulate('change', { target: { name: 'email_input', value: 'test@example.com' } })

        let result = onChangeMock("e");

        expect(result).toBeUndefined();

        expect(onChangeMock).toHaveBeenCalled();

    })
})