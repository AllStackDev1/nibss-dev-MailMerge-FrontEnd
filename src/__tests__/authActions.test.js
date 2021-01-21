import * as  actions from "../actions/authActions"
import { authConstants } from "../constants"
import thunk from 'redux-thunk'
import configureMockStore from "redux-mock-store"
import fetchMock from 'fetch-mock'


const middleware = [thunk]
const mockStore = configureMockStore(middleware)
const applicationJson = 'application/json'

test("login actions", () => {
    const data = {
        password: "123qw",
        email: "example@com"
    }

    const store = mockStore({ user: [] })


    fetchMock.post('https://nibss-mail-merge.natterbase.com/auth/login', {
        headers: { 'Content-Type': applicationJson },
        body: JSON.stringify(data),
    })
    store.dispatch(actions.authActions.login({ email_input: "exa" }))

    expect(store.getActions()).toEqual([{ type: authConstants.LOGIN_REQUEST }])

})

test("logout action", () => {
    const store = mockStore({})
    store.dispatch(actions.authActions.logout())

    expect(store.getActions()).toEqual([{ type: authConstants.LOGOUT }])
})

test("reset action", () => {

    const data = jest.fn();

    const store = mockStore({})


    fetchMock.post('https://nibss-mail-merge.natterbase.com/users/invite/complete', {
        headers: { 'Content-Type': applicationJson },
        body: JSON.stringify(data),
    })
    store.dispatch(actions.authActions.saveSignature("", false));

    expect(store.getActions()).toEqual([{ type: authConstants.UPLOAD_START }])

})

test("delete signature action", () => {
    const data = ""
    const store = mockStore({})


    fetchMock.post('https://nibss-mail-merge.natterbase.com/users/remove/signature', {
        headers: { 'Content-Type': applicationJson },
        body: JSON.stringify(data),
    })
    store.dispatch(actions.authActions.deleteSignature(""));

    expect(store.getActions()).toEqual([{ type: authConstants.START_DELETE_SIGNATURE, signature: "" }])

})

test("reset action", () => {
    const store = mockStore({})
    store.dispatch(actions.authActions.reset());

    expect(store.getActions()).toEqual([{ type: authConstants.RESET_UPLOAD }])

})

test("fetch profile action", () => {

    const store = mockStore({})


    fetchMock.get('https://nibss-mail-merge.natterbase.com/users', {
        headers: { 'Content-Type': applicationJson }
    })
    store.dispatch(actions.authActions.fetchProfile());

    expect(store.getActions()).toEqual([{ type: authConstants.START_FETCH_PROFILE }])
})

test("update profile action", () => {

    const data = ""
    const store = mockStore({})


    fetchMock.put('https://nibss-mail-merge.natterbase.com/users', {
        headers: { 'Content-Type': applicationJson },
        body: JSON.stringify(data),
    })
    store.dispatch(actions.authActions.updateProfile("user"));

    expect(store.getActions()).toEqual([{ type: authConstants.START_UPDATE_PROFILE }])

})
