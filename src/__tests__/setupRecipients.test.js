import React from 'react';
import { shallow } from 'enzyme';
import SetupRecipients from "../components/Dashboard/snippets/documents/SetupRecipients"
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

it("should handle scroll bar", () => {

    const wrapper = shallowSetup()
    const customElem = wrapper.find(".custom-scrollbar")

    customElem.simulate("scroll", { target: { scrollHeight: 100 } })
    expect(customElem.length).toBe(1);
})

it("should handle inout field change", () => {

    const wrapper = shallowSetup();

    const inputElem = wrapper.find(".width-250");
    inputElem.simulate("change", { target: { name: "name", value: "value" } })

    expect(wrapper.find(".width-250").length).toBe(1);
})

