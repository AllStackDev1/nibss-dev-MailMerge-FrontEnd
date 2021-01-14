import React from 'react';
import { shallow } from 'enzyme';
import Onboarding from "../components/onboarding/onboarding"
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


    return shallow(
        <Onboarding />
    )

}

describe("component renders", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({ user: { users: "" } });
        });

    });

    afterEach(() => {
        useSelector.mockClear();
    });


    it('should render login component successfully', () => {
        const wrapper = shallowSetup()
        expect(wrapper).toBeTruthy();
    })
})