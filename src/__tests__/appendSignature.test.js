import React from 'react';
import { mount } from 'enzyme';
import AppendSignature from "../components/Dashboard/AppendSignature"
import { useSelector, Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/documentReducer';



jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ documentId: 123 }),
}))

jest.mock("react", () => ({
    ...jest.requireActual('react'),
    useEffect: () => ({})
}))


const shallowSetup = (props = {}) => {

    jest.mock("react-redux", () => ({
        ...jest.requireActual("react-redux"),
        useSelector: jest.fn()
    }))


    const store = createStore(reducer, { document: "1234" });

    return mount(
        <Provider store={store}>
            <AppendSignature />
        </Provider>
    )

}

beforeEach(() => {
    useSelector.mockImplementation(callback => {
        return callback({ documents: { document: "1234" } });
    });

});

afterEach(() => {
    useSelector.mockClear();
});


it("should render component", () => {

    const wrapper = shallowSetup();
    expect(wrapper).toBeTruthy();
})

it("should render component without errors", () => {

    const wrapper = shallowSetup();
    expect(wrapper.find('[data-test="component-append-signature"]').length).toBe(1);

})

it("", () => {

    const stateMock = jest.fn();
    const useSelectorMock = jest.fn(stateMock);

    const wrapper = mount(<AppendSignature useSelector={useSelectorMock} />)

})