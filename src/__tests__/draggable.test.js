import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import Draggable from "../components/Dashboard/snippets/documents/Draggable"
import { createStore } from 'redux';
import reducer from '../reducers/userReducer';
import { useSelector, Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';



/**
 * 
 * @param {objects} props 
 * @returns {ShallowWrapper}
 */

const shallowSetup = (props = {}) => {

    return mount(
        <Draggable />
    )

}


jest.mock("react", () => ({
    ...jest.requireActual('react'),
    useEffect: () => ({})
}))


describe("component renders", () => {

    it("should render without errors", () => {

        const wrapper = shallowSetup();
        expect(wrapper).toBeTruthy();
    })
})

