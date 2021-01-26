import React from 'react';
import { shallow, mount } from 'enzyme';
import UserProfile from "../components/Dashboard/UserProfile"
import { useSelector } from "react-redux";
import { render, fireEvent } from "@testing-library/react"
import { BrowserRouter } from 'react-router-dom'

const shallowSetup = (props = {}) => {
    jest.mock("react-redux", () => ({
        ...jest.requireActual("react-redux"),
        useSelector: jest.fn()
    }));

    jest.mock("react", () => ({
        ...jest.requireActual('react'),
        useEffect: () => ({})
    }))

    const auth = useSelector(state => state.auth);

    useSelector.mockImplementation(() => auth)

    return mount(<UserProfile auth={auth} />)

}


describe("user profile setup", () => {

    it("should have a form", () => {

        const wrapper = shallowSetup();
        expect(wrapper.find('form').length).toBe(1);
    })

    it("should have name text field", () => {

        const wrapper = shallowSetup();
        expect(wrapper.find("[name='name']").length).toBe(1);

    })

    it("should have mobile text field", () => {
        const wrapper = shallowSetup();
        expect(wrapper.find("[name='mobile']").length).toBe(1);
    })

    it("should have email field", () => {
        const wrapper = shallowSetup();
        expect(wrapper.find("[name='email']").length).toBe(1);
    })

    it("should have a submit button", () => {
        const wrapper = shallowSetup();
        expect(wrapper.find("[type='submit']").length).toBe(1);
    })

    it("should render component with renderButtonContent func", () => {

        const renderButtonContentMock = jest.fn()

        const wrapper = shallow(<UserProfile renderButtonContent={renderButtonContentMock} />)
        renderButtonContentMock();
        expect(renderButtonContentMock).toHaveBeenCalledTimes(1)


        expect(wrapper.find("lds-ring").length).toBe(0);

        expect(wrapper.find("[data-test='render-button']").text()).toEqual("UPDATE PROFILE");

    })

    it("should render component with renderSignatures func", () => {
        const renderSignaturesMock = jest.fn();

        const wrapper = mount(<UserProfile renderSignatures={renderSignaturesMock} />)
        let renderSignaturesFunc = renderSignaturesMock();
        expect(renderSignaturesMock).toHaveBeenCalledTimes(1)
    })

    it("should handle tab 1 click", () => {



        const setTabMock = jest.fn();

        const { getByTestId } = render(<UserProfile />)
        fireEvent.click(getByTestId("tab1"))

        // expect(setTabMock.mock.calls.length).toBe(1)

    })

    it("should handle tab 2 click", () => {

        const setTabMock = jest.fn();
        const { getByTestId } = render(<BrowserRouter><UserProfile /></BrowserRouter>)
        fireEvent.click(getByTestId("tab2"))

        // expect(setTabMock.mock.calls.length).toBe(1)
    })

})