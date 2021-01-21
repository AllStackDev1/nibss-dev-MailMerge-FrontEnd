import React from 'react';
import { shallow } from 'enzyme';
import SaveSignature from "../components/onboarding/steps/saveSignature"
import { createStore } from 'redux';
import reducer from '../reducers/authReducer';
import { useSelector } from 'react-redux';



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

    const store = createStore(reducer, { auth: { uploading: false } });

    return shallow(
        <SaveSignature />
    )

}


describe("component renders", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({ auth: { uploading: false } });
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