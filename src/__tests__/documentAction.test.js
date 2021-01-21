import * as  actions from "../actions/documentActions"
import { documentConstants } from "../constants"
import thunk from 'redux-thunk'
import configureMockStore from "redux-mock-store"
import fetchMock from 'fetch-mock'


const middleware = [thunk]
const mockStore = configureMockStore(middleware)
const applicationJson = 'application/json'

test("fetch actions", () => {
    const store = mockStore({})

    fetchMock.get('https://nibss-mail-merge.natterbase.com/documents?', {
        headers: { 'Content-Type': applicationJson },
    })
    store.dispatch(actions.documentActions.fetch("type"))

    expect(store.getActions()).toEqual([{ type: documentConstants.FETCH_REQUEST }])

})

test("fetch single action", () => {
    const store = mockStore({})

    fetchMock.get('https://nibss-mail-merge.natterbase.com/documents/abc', {
        headers: {
            'Authorization': 'Bearer ' + 'token1111',
            'Accept': applicationJson,
            'Content-Type': applicationJson
        }
    }, { overwriteRoutes: true })
    store.dispatch(actions.documentActions.fetchSingle("abc", "token1111"))

    expect(store.getActions()).toEqual([{ type: 'FETCH_SINGLE_DOCUMENT_REQUEST' }])

})

test("fetch page action", () => {

    const store = mockStore({})

    fetchMock.get('https://nibss-mail-merge.natterbase.com/documents?page=page&', { overwriteRoutes: false })
    store.dispatch(actions.documentActions.fetchPage("123", "page"))

    expect(store.getActions()).toEqual([{ type: documentConstants.FETCH_PAGE_REQUEST }])

})

test("sign document action", () => {

    const store = mockStore({})

    fetchMock.post('https://nibss-mail-merge.natterbase.com/documents/sign', {
        'Authorization': 'Bearer ' + "token123",
        'Accept': applicationJson,
        'Content-Type': applicationJson
    }, { overwriteRoutes: true })
    store.dispatch(actions.documentActions.signDocument("123", "token123"))

    expect(store.getActions()).toEqual([{ type: documentConstants.SIGN_DOCUMENT_REQUEST }])

})

test("sign new document action", () => {

    const store = mockStore({})

    fetchMock.post('https://nibss-mail-merge.natterbase.com/documents/sign', {
        'Authorization': 'Bearer ' + "token123",
        'Accept': applicationJson,
        'Content-Type': applicationJson
    }, { overwriteRoutes: true })
    store.dispatch(actions.documentActions.signDocumentNew("123", "token123"))

    expect(store.getActions()).toEqual([{ type: documentConstants.SIGN_DOCUMENT_REQUEST }])

})

test("sign new document action", () => {

    const store = mockStore({})

    fetchMock.post('https://nibss-mail-merge.natterbase.com/documents/prepare', {
        'Authorization': 'Bearer ' + "token123",
        'Accept': applicationJson,
        'Content-Type': applicationJson
    }, { overwriteRoutes: true })
    store.dispatch(actions.documentActions.prepare("document", "signature"))

    expect(store.getActions()).toEqual([{ type: documentConstants.PREPARE_DOCUMENT_START }])

})
