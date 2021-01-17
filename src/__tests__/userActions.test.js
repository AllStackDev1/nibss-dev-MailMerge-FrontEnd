import * as  actions from "../actions/userActions"
import { userConstants } from "../constants"
import thunk from 'redux-thunk'
import configureMockStore from "redux-mock-store"
import fetchMock from 'fetch-mock'


const middleware = [thunk]
const mockStore = configureMockStore(middleware)

test("add actions", () => {
    const store = mockStore({})

    fetchMock.post('https://nibss-mail-merge.natterbase.com/admin/invite', {
        headers: { 'Content-Type': 'application/json' },
    })
    store.dispatch(actions.userActions.invite([{ role: "role" }, { administrator: "administrator" }], "add"))

    expect(store.getActions()).toEqual([{ type: userConstants.INVITE_REQUEST }])

})

test("edit actions", () => {

    const store = mockStore({})

    fetchMock.put('https://nibss-mail-merge.natterbase.com/admin/users/123', {
        headers: { 'Content-Type': 'application/json' },
    })
    store.dispatch(actions.userActions.edit({ role: "role", _id: "123" }))

    expect(store.getActions()).toEqual([{ type: userConstants.EDIT_REQUEST }])

})

test("deleteUser action", () => {

    const store = mockStore({})

    fetchMock.delete('https://nibss-mail-merge.natterbase.com/admin/users/123', {
        headers: { 'Content-Type': 'application/json' },
    })
    store.dispatch(actions.userActions.deleteUser({ role: "role", _id: "123" }))

    expect(store.getActions()).toEqual([{ type: userConstants.DELETE_REQUEST, user: { "_id": "123", "role": "role", } }])

})

test("exportDocument action", () => {

    const store = mockStore({})

    fetchMock.get('https://nibss-mail-merge.natterbase.com/admin/users/download/type', {
        headers: { 'Content-Type': 'application/json' },
    })
    store.dispatch(actions.userActions.exportDocument("type"))

    expect(store.getActions()).toEqual([{ type: userConstants.DOWNLOAD_REQUEST }])

})

test("updateRole  action", () => {

    const store = mockStore({})

    fetchMock.put('https://nibss-mail-merge.natterbase.com/admin/users/role/123', {
        headers: { 'Content-Type': 'application/json' },
    })
    store.dispatch(actions.userActions.updateRole({ role: "role", _id: "123" }))

    expect(store.getActions()).toEqual([{ type: userConstants.ASSIGN_AS_ADMIN_REQUEST, user: { "_id": "123", "role": "role", } }])

})

test("fetchUsers action", () => {

    const store = mockStore({})

    fetchMock.get('https://nibss-mail-merge.natterbase.com/admin/users', {
        headers: { 'Content-Type': 'application/json' },
    })
    store.dispatch(actions.userActions.fetchUsers())

    expect(store.getActions()).toEqual([{ type: userConstants.FETCH_REQUEST, }])

})

test("fetchPage action", () => {

    const store = mockStore({})

    fetchMock.get('https://nibss-mail-merge.natterbase.com/admin/users?page=page', {
        headers: { 'Content-Type': 'application/json' },
    })
    store.dispatch(actions.userActions.fetchPage("page"))

    expect(store.getActions()).toEqual([{ type: userConstants.FETCH_PAGE_REQUEST, }])

})

test("search action", () => {

    const store = mockStore({})

    fetchMock.get('https://nibss-mail-merge.natterbase.com/admin/users/search?search=search%20query&filter=filter', {
        headers: { 'Content-Type': 'application/json' },
    })
    store.dispatch(actions.userActions.search("search query", "filter"))

    expect(store.getActions()).toEqual([{ type: userConstants.SEARCH_REQUEST, }])

})

test("reset action", () => {
    const store = mockStore({})
    store.dispatch(actions.userActions.reset())
    expect(store.getActions()).toEqual([{ type: userConstants.INVITE_RESET, }])
})

test("clearSearch action", () => {
    const store = mockStore({})
    store.dispatch(actions.userActions.clearSearch())
    expect(store.getActions()).toEqual([{ type: userConstants.CLEAR_SEARCH_RESULTS, }])
})