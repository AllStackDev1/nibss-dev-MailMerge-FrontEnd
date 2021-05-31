import React from 'react';
import DocumentTab from "../components/Dashboard/snippets/documents/DocumentTab"
import { render, fireEvent, mount } from "@testing-library/react"

it("should render properly", () => {
    const wrapper = () => mount(<DocumentTab {...{tab: 1, index: 1}} /> );
    expect(wrapper).toMatchSnapshot();
})


it("should click user search result", () => {

    const setTabMock = jest.fn();

    const { getByTestId } = render(<DocumentTab setTab={setTabMock} />)
    fireEvent.click(getByTestId("doc-tab"))

    expect(setTabMock.mock.calls.length).toBe(1)

})