import React from 'react';
import DocumentCreationSuccessful from "../components/Dashboard/snippets/documents/DocumentCreationSuccessful"
import { render, fireEvent } from "@testing-library/react"


it("should click user search result", () => {

    const setUploadingDocumentMock = jest.fn();

    const { getByText } = render(<DocumentCreationSuccessful setUploadingDocument={setUploadingDocumentMock} />)
    fireEvent.click(getByText("CONTINUE TO DOCUMENTS"))

    expect(setUploadingDocumentMock.mock.calls.length).toBe(1)

})