import React from 'react';
import { mount } from 'enzyme';
import Recipients from "../components/Dashboard/Recipients"
import { useSelector, Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/recipientReducer';
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

    const store = createStore(reducer, { recipients: {} });

    if (state) {
        <Recipients {...state} />
    }



    return mount(
        <Provider store={store}>
            <BrowserRouter>
                <Recipients />
            </BrowserRouter>
        </Provider>
    )
}



describe("component renders", () => {



    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({ recipients: {} });
        });

    });

    afterEach(() => {
        useSelector.mockClear();
    });




    it("should render without errors", () => {
        const store = createStore(reducer, { recipients: {} });

        const wrapper = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <Recipients />
                </BrowserRouter>
            </Provider>)

        expect(wrapper).toBeTruthy();
    })
})



it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})



