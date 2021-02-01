import React from 'react';
import { mount } from 'enzyme';
import Draggable from "../components/Dashboard/snippets/documents/Draggable"
import { act } from "@testing-library/react"


/**
 * 
 * @param {objects} props 
 * @returns {ShallowWrapper}
 */

const shallowSetup = (props = {}) => {

    return mount(
        <Draggable {...props} />
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

it("should handle mouse down zero button", () => {

    const wrapper = shallowSetup();
    const containerElem = wrapper.find(".full-width").at(0)

    containerElem.prop("onMouseDown")({ button: 2 })

    expect(containerElem.prop("onMouseDown")).toBeTruthy()

})

it("should handle drag position", () => {

    const wrapper = shallowSetup({ setSignatoryDragged: jest.fn() });
    const containerElem = wrapper.find(".full-width").at(0)

    act(() => {
        containerElem.prop("onMouseDown")({ button: 0, stopPropagation: jest.fn(), preventDefault: jest.fn() })
    })

})

