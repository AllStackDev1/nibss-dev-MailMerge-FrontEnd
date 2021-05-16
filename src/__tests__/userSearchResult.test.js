import React from 'react';
import UserSearchResult from "../components/Dashboard/snippets/documents/UserSearchResult"
import { render, fireEvent } from "@testing-library/react"

it('should match snapshot', () => {
    const wrapper = render(<UserSearchResult index={1} length={2} />)
    expect(wrapper).toBeTruthy();
})


it("should click user search result", () => {
    const selectUserMock = jest.fn();
    const setSearchMock = jest.fn();
    const { getByTestId } = render(<UserSearchResult selectUser={selectUserMock} setSearchTerm={setSearchMock} user={{ name: "name" }} />)
    fireEvent.click(getByTestId("search-result"))
    expect(selectUserMock.mock.calls.length).toBe(1)
})