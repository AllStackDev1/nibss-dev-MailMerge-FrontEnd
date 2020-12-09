import React from 'react';
import { mount, shallow } from 'enzyme';
import Login from "../components/auth/login"
import { mockDispatch, mockState, Provider } from "react-redux";
import { createStore } from 'redux';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import reducer from '../reducers/authReducer';


const mockStore = configureMockStore([thunk]);
// console.log("MOCK::>", mockState());

/**
 * 
 * @param {objects} props 
 * @returns {ShallowWrapper}
 */

const shallowSetup = (props = {}) => {

    const store = mockStore(reducer, {
        auth: {
            loggingIn: false
        }
    });



    const wrapper = shallow(
        <Provider store={store}>
            <Login />
        </Provider>
    )


    return wrapper
}

test('check if component renders', () => {

    const wrapper = shallowSetup()


    // expect(mockStore.getState().auth.loggingIn).toBe(false)
    expect(wrapper).toBeTruthy();

})

test('check for email field', () => {

    const wrapper = shallowSetup();

    expect(wrapper.find('input').length).toBe(0)

})

test('check for password field', () => {

})

describe('if users enter a wrong login details', () => {
    it('should display wrong password message', () => {

    })
})

describe('if users enter the right login details', () => {
    it('should display success message', () => {

    })
})