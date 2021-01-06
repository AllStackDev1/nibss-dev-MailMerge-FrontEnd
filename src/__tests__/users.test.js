import React from 'react';
import { mount } from 'enzyme';
import Users from "../components/Dashboard/Users"
import { useSelector, Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/userReducer';
import { BrowserRouter } from 'react-router-dom';


jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ pageId: "123" }),
}))


const shallowSetup = (props = {}, state) => {

    jest.mock("react-redux", () => ({
        ...jest.requireActual("react-redux"),
        useSelector: jest.fn()
    }));

    const store = createStore(reducer, { user: {} });

    if (state) {
        <Recipients {...state} />
    }

    return mount(
        <Provider store={store}>
            <BrowserRouter>
                <Users {...props} />
            </BrowserRouter>
        </Provider>
    )
}



describe("component renders", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({ users: {} });
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



it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

