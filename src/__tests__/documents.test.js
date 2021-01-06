import React from 'react';
import { mount } from 'enzyme';
import Documents from "../components/Dashboard/Documents"
import { useSelector, Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/documentReducer';
import { BrowserRouter } from 'react-router-dom';


jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ documentId: 123 }),
}))


const shallowSetup = (props = {}) => {

    jest.mock("react-redux", () => ({
        ...jest.requireActual("react-redux"),
        useSelector: jest.fn()
    }));

    const store = createStore(reducer, { documents: "123" });


    return mount(
        <Provider store={store}>
            <BrowserRouter>
                <Documents {...props} />
            </BrowserRouter>
        </Provider>
    )
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


    it("should render without errors", () => {

        const wrapper = shallowSetup();
        expect(wrapper).toBeTruthy();
    })
})



it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

