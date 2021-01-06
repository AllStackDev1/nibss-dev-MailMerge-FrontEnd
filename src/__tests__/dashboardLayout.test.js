import React from 'react';
import { mount } from 'enzyme';
import DashboardLayout from "../components/common/Layout/DashboardLayout"
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers/authReducer';
import Sidebar from "../components/common/Sidebar/DashboardSidebar.js";
import { BrowserRouter } from 'react-router-dom';

const shallowSetup = (props = {}) => {

    const getRoutesMock = jest.fn();
    const logoutMock = jest.fn();
    const store = createStore(reducer, { logout: logoutMock });


    return mount(
        <Provider store={store} {...props}>
            <BrowserRouter>
                <DashboardLayout />
            </BrowserRouter>
        </Provider>
    )
}


describe("dashboard layout component", () => {

    const wrapper = ""

    it("should not be null", () => {
        const wrapper = shallowSetup(Sidebar);
        expect(wrapper).toBeTruthy();
    })

    it('should map state to props', () => {
        const mapStateToPropsMock = jest.fn();
        const logoutMock = jest.fn();

        const localStorageMock = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
        };
        global.localStorage = localStorageMock;

        const store = createStore(reducer, { logout: logoutMock });


        let wrapper = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <DashboardLayout mapStateToProps={mapStateToPropsMock} />
                </BrowserRouter>
            </Provider>
        )

        localStorageMock.getItem();

        expect(localStorageMock.getItem.mock.calls.length).toBe(1);

    })

    it('should match snapshot', () => {
        const wrapper = shallowSetup()
        expect(wrapper).toMatchSnapshot();
    })


})

