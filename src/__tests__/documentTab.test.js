import React from 'react';
import DocumentTab from "../components/Dashboard/snippets/documents/DocumentTab"
import { render, fireEvent } from "@testing-library/react"


it("should click user search result", () => {

    const setTabMock = jest.fn();

    const { getByTestId } = render(<DocumentTab setTab={setTabMock} />)
    fireEvent.click(getByTestId("doc-tab"))

    expect(setTabMock.mock.calls.length).toBe(1)

})