import React from 'react';
import { mount } from 'enzyme';
import DashboardIndex from "../components/Dashboard/DashboardIndex"
import { Provider } from 'react-redux';
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

    const wrapper = shallowSetup();
    expect(wrapper).toBeTruthy();
})