import React from 'react';
import { mount } from 'enzyme';
import DashboardIndex from "../components/Dashboard/DashboardIndex"
import { useSelector, Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/documentReducer';



const shallowSetup = (props = {}) => {

    const store = createStore(reducer, { documents: "123" });


    return mount(
        <Provider store={store} {...props}>
            <DashboardIndex />
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




