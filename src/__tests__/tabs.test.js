import React from 'react';
import { shallow } from 'enzyme';
import Tabs from "../components/Dashboard/snippets/documents/DocumentTabs"
import { render, fireEvent } from "@testing-library/react"


const shallowSetup = (props = {}) => {

    return shallow(<Tabs />)
}

it('should match snapshot', () => {
    const wrapper = shallowSetup()
    expect(wrapper).toMatchSnapshot();
})

it("should click tab 1", () => {

    const fetchMock = jest.fn();
    const setTabMock = jest.fn();

    const { getByTestId } = render(<Tabs fetch={fetchMock} tab={1} fetching={true} setTab={setTabMock} />)
    fireEvent.click(getByTestId("tab1"))

    expect(setTabMock.mock.calls.length).toBe(1)

})

it("should click tab 2", () => {

    const fetchMock = jest.fn();
    const setTabMock = jest.fn();

    const { getByTestId } = render(<Tabs fetch={fetchMock} tab={2} fetching={false}  setTab={setTabMock}    documents={{ documents: {} }}/>)
    fireEvent.click(getByTestId("tab2"))

    expect(setTabMock.mock.calls.length).toBe(1)

})

it("should click tab 3", () => {

    const fetchMock = jest.fn();
    const setTabMock = jest.fn();

    const { getByTestId } = render(<Tabs fetch={fetchMock} tab={3} fetching={true} setTab={setTabMock} documents={{ documents: {} }} />)
    fireEvent.click(getByTestId("tab3"))

    expect(setTabMock.mock.calls.length).toBe(1)

})

it("should click tab 4", () => {

    const fetchMock = jest.fn();
    const setTabMock = jest.fn();

    const { getByTestId } = render(<Tabs fetch={fetchMock} tab={4} fetching={false} setTab={setTabMock} documents={{ documents: {} }} />)
    fireEvent.click(getByTestId("tab4"))

    expect(setTabMock.mock.calls.length).toBe(1)

})

// it("should render tab stats", () => {

//     const fetchMock = jest.fn();
//     const setTabMock = jest.fn();

//     const { getByTestId } = render(<Tabs fetch={fetchMock} setTab={setTabMock} fetching={true}  documents={{ documents: {} }} />)
//     fireEvent.click(getByTestId("tab1"))

//     expect(setTabMock.mock.calls.length).toBe(1)


// })