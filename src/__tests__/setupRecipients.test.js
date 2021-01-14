import React from 'react';
import { shallow, mount } from 'enzyme';
import SetupRecipients from "../components/Dashboard/snippets/documents/SetupRecipients"
import { createStore } from 'redux';
import reducer from '../reducers/authReducer';
import { useSelector, Provider } from 'react-redux';



/**
 * 
 * @param {objects} props 
 * @returns {ShallowWrapper}
 */

const shallowSetup = (props = {}) => {
    jest.mock("react-redux", () => ({
        ...jest.requireActual("react-redux"),
        useSelector: jest.fn()
    }));

    const store = createStore(reducer, { document: { recipients: { length: 0 } } });

    return shallow(

        <SetupRecipients />
    )

}


describe("component renders", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({ document: { recipients: { length: 0 } } });
        });

    });

    afterEach(() => {
        useSelector.mockClear();
    });


    it('should render save signature component successfully', () => {
        const wrapper = shallowSetup()
        expect(wrapper).toBeTruthy();
    })

    it('should match snapshot', () => {
        const wrapper = shallowSetup()
        expect(wrapper).toMatchSnapshot();
    })
})