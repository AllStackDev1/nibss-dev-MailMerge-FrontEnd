import React from 'react';
import { mount } from 'enzyme';
import DocumentInstance from "../components/Dashboard/DocumentInstance"
import { useSelector, Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/documentReducer';


jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ documentId: 123 }),
}))


const shallowSetup = (props = {}) => {

    const store = createStore(reducer, { documents: "123" });


    return mount(
        <Provider store={store} {...props}>
            <DocumentInstance />
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

it("should have a snapshot without error", () => {

    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();

})