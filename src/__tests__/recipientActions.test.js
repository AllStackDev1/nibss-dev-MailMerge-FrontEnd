import * as  actions from "../actions/recipientActions"
import { recipientConstants } from "../constants"
import thunk from 'redux-thunk'
import configureMockStore from "redux-mock-store"
import fetchMock from 'fetch-mock'


const middleware = [thunk]
const mockStore = configureMockStore(middleware)
const applicationJson = 'application/json'

test("add actions", () => {
    const store = mockStore({})

    fetchMock.post('https://nibss-mail-merge.natterbase.com/admin/recipient/multiple', {
        headers: { 'Content-Type': applicationJson },
    })
    store.dispatch(actions.recipientActions.add("recipient", "type"))

    expect(store.getActions()).toEqual([{ type: recipientConstants.ADD_RECIPIENT_REQUEST }])

})

test("delete recipient actions", () => {

    const store = mockStore({})

    fetchMock.delete('https://nibss-mail-merge.natterbase.com/admin/recipient/undefined', {
        headers: { 'Content-Type': applicationJson },
    })
    store.dispatch(actions.recipientActions.deleteRecipient("recipient", "type"))

    expect(store.getActions()).toEqual([{ type: recipientConstants.DELETE_RECIPIENT_REQUEST, recipient: "recipient" }])

})

test("delete tag action", () => {

    const store = mockStore({})

    fetchMock.delete('https://nibss-mail-merge.natterbase.com/admin/recipient/tag/undefined', {
        headers: { 'Content-Type': applicationJson },
    })
    store.dispatch(actions.recipientActions.deleteTag("tag"))

    expect(store.getActions()).toEqual([{ type: recipientConstants.DELETE_TAG_REQUEST, tag: "tag" }])

})

test("edit action", () => {
    const store = mockStore({})

    fetchMock.put('https://nibss-mail-merge.natterbase.com/admin/recipient/undefined', {
        headers: { 'Content-Type': applicationJson },
    })
    store.dispatch(actions.recipientActions.edit("recipient"))

    expect(store.getActions()).toEqual([{ type: recipientConstants.EDIT_RECIPIENT_REQUEST }])
})

test("add tag action", () => {
    const store = mockStore({})

    fetchMock.post('https://nibss-mail-merge.natterbase.com/admin/recipient/tag', {
        headers: { 'Content-Type': applicationJson },
    })
    store.dispatch(actions.recipientActions.addTag("tag"))

    expect(store.getActions()).toEqual([{ type: recipientConstants.ADD_TAG_REQUEST }])
})

test("add tags to recipient", () => {

    const store = mockStore({})

    fetchMock.put('https://nibss-mail-merge.natterbase.com/admin/recipient/recipient', {
        headers: { 'Content-Type': applicationJson },
    })
    store.dispatch(actions.recipientActions.addTagsToRecipient("recipient", "tag"))

    expect(store.getActions()).toEqual([{ type: recipientConstants.ADD_TAG_TO_RECIPIENT_REQUEST }])

})

test("fetch action", () => {

    const store = mockStore({})

    fetchMock.get('https://nibss-mail-merge.natterbase.com/admin/recipient', {
        headers: { 'Content-Type': applicationJson },
    })
    store.dispatch(actions.recipientActions.fetch("src"))

    expect(store.getActions()).toEqual([{ type: recipientConstants.FETCH_REQUEST }])

})

test("search action", () => {

    const store = mockStore({})

    fetchMock.get('https://nibss-mail-merge.natterbase.com/admin/recipient/search?search=search%20query&filter=%22filter%22', {
        headers: { 'Content-Type': applicationJson },
    })
    store.dispatch(actions.recipientActions.search("search query", "filter", "src"))

    expect(store.getActions()).toEqual([{ type: recipientConstants.SEARCH_REQUEST }])

})

test("fetchPage action", () => {

    const store = mockStore({})

    fetchMock.get('https://nibss-mail-merge.natterbase.com/admin/recipient?page=page', {
        headers: { 'Content-Type': applicationJson },
    })
    store.dispatch(actions.recipientActions.fetchPage("page", "src"))

    expect(store.getActions()).toEqual([{ type: recipientConstants.FETCH_PAGE_REQUEST }])

})

test("fetchTags action", () => {

    const store = mockStore({})

    fetchMock.get('https://nibss-mail-merge.natterbase.com/admin/recipient/tag', {
        headers: { 'Content-Type': applicationJson },
    })
    store.dispatch(actions.recipientActions.fetchTags())

    expect(store.getActions()).toEqual([{ type: recipientConstants.FETCH_TAGS_REQUEST }])

})
