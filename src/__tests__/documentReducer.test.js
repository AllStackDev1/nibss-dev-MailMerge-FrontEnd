import { documentConstants } from "../constants"
import document from "../reducers/documentReducer"



describe("document reducer", () => {

    test("empty state", () => {
        expect(document(undefined)).toEqual({
            fetching: false,
            fetchingSingle: false,
            fetchingPage: false
        })
    })

    test("fetch request", () => {
        expect(document({}, { type: documentConstants.FETCH_REQUEST })).toEqual({
            fetching: true
        })
    })

    test("fetch success", () => {
        expect(document({}, { type: documentConstants.FETCH_SUCCESS, documents: "documents" })).toEqual({
            fetching: false,
            documents: "documents"
        })
    })

    test("fetch failure", () => {
        expect(document({}, { type: documentConstants.FETCH_FAILURE, documents: {} })).toEqual({
            fetching: false,
            documents: {}
        })
    })

    test("sign document request ", () => {
        expect(document({}, { type: documentConstants.SIGN_DOCUMENT_REQUEST, })).toEqual({
            signingDocument: true
        })
    })

    test("sign document success ", () => {
        expect(document({}, { type: documentConstants.SIGN_DOCUMENT_SUCCESS, document: "documents" })).toEqual({
            signingDocument: false,
            document: "documents"
        })
    })

    test("sign document failure ", () => {
        expect(document({}, { type: documentConstants.SIGN_DOCUMENT_FAILURE, })).toEqual({
            signingDocument: false,
        })
    })

    test("fetch page request", () => {
        expect(document({}, { type: documentConstants.FETCH_PAGE_REQUEST, })).toEqual({
            fetchingPage: true
        })
    })

    test("fetch page success", () => {
        expect(document({}, { type: documentConstants.FETCH_PAGE_SUCCESS, documents: "documents" })).toEqual({
            fetchingPage: false,
            documents: "documents"
        })
    })

    test("fetch page failure", () => {
        expect(document({}, { type: documentConstants.FETCH_PAGE_FAILURE, documents: {} })).toEqual({
            fetchingPage: false,
            documents: {}
        })
    })

    test("prepare docuemnt start", () => {
        expect(document({}, { type: documentConstants.PREPARE_DOCUMENT_START, document: {} })).toEqual({
            preparing: true,
            document: {}
        })
    })

    test("prepare docuemnt success", () => {
        expect(document({}, { type: documentConstants.PREPARE_DOCUMENT_SUCCESS, response: "response" })).toEqual({
            preparing: false,
            document: "response"
        })
    })

    test("prepare docuemnt error", () => {
        expect(document({}, { type: documentConstants.PREPARE_DOCUMENT_ERROR, document: {} })).toEqual({
            preparing: false,
            document: {}
        })
    })

    test("fetch single request", () => {
        expect(document({}, { type: documentConstants.FETCH_SINGLE_REQUEST, })).toEqual({
            fetchingSingle: true
        })
    })

    test("fetch single success", () => {
        expect(document({}, { type: documentConstants.FETCH_SINGLE_SUCCESS, document: "document" })).toEqual({
            fetchingSingle: false,
            document: "document"
        })
    })

    test("fetch single failure", () => {
        expect(document({}, { type: documentConstants.FETCH_SINGLE_FAILURE, document: "document" })).toEqual({
            fetchingSingle: false
        })
    })
})