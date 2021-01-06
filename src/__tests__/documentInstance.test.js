import React from 'react';
import { mount } from 'enzyme';
import DocumentInstance from "../components/Dashboard/DocumentInstance"
import { Provider } from 'react-redux';
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

    const wrapper = shallowSetup();
    expect(wrapper).toBeTruthy();
})

it("should have a snapshot without error", () => {

    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();

})