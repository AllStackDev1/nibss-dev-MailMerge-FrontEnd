import { userConstants } from "../constants"
import user from "../reducers/user"



describe("user reducer", () => {

    test("empty state", () => {
        expect(user(undefined)).toEqual({
            invitingUsers: false
        })
    })

    test("invite request", () => {
        expect(user({}, { type: userConstants.INVITE_REQUEST })).toEqual({
            invitingUsers: true,
            users: false
        })
    })

    test("invite success", () => {
        expect(user({}, { type: userConstants.INVITE_SUCCESS, users: "users" })).toEqual({
            invitingUsers: false,
            users: "users"
        })
    })

    test("invite failure", () => {
        expect(user({}, { type: userConstants.INVITE_FAILURE })).toEqual({
            invitingUsers: false,
        })
    })

    test("delete request", () => {
        expect(user({}, { type: userConstants.DELETE_REQUEST, user: "user" })).toEqual({
            deleting: "user"
        })
    })

    test("delete success", () => {
        expect(user({ platformUsers: { data: [{ _id: "123" }] } }, { type: userConstants.DELETE_SUCCESS, user: { user: { _id: "123" } } })).toEqual({
            deleting: false,
            platformUsers: { data: [], },
        })
    })

    test("delete failure", () => {
        expect(user({}, { type: userConstants.DELETE_FAILURE })).toEqual({
            deleting: false
        })
    })

    test("edit  request", () => {
        expect(user({}, { type: userConstants.EDIT_REQUEST })).toEqual({
            editing: true
        })
    })

    test("edit  success", () => {
        expect(user({ platformUsers: { data: [{ _id: "123" }] }, searchResults: { data: [{ _id: "123" }] } },
            { type: userConstants.EDIT_SUCCESS, user: { user: { _id: '123' } } })).toEqual({
                editing: false,
                platformUsers: {
                    data: [
                        {
                            _id: "123",
                        },
                    ],
                },
                searchResults: {
                    data: [{ _id: "123", }]
                }
            })
    })

    test("edit  failure", () => {
        expect(user({}, { type: userConstants.EDIT_FAILURE })).toEqual({
            editing: false
        })
    })

    test("assign as admin request", () => {
        expect(user({}, { type: userConstants.ASSIGN_AS_ADMIN_REQUEST, user: "user" })).toEqual({
            updatingRole: "user"
        })
    })

    test("assign as admin success", () => {
        expect(user({
                platformUsers: {
                    data: [{ _id: "123" }]
                },
                searchResults: {
                    data: [{ _id: "123" }]
                }
            },
            {
                type: userConstants.ASSIGN_AS_ADMIN_SUCCESS,
                user: { user: { _id: "123" } }
            })).toEqual({
                updatingRole: false,
                platformUsers: {
                    data: [
                        {
                            _id: "123",
                        },
                    ],
                },
                searchResults: {
                    data: [{ _id: "123", }]
                }
            })
    })

    test("assign as admin failure", () => {
        expect(user({}, { type: userConstants.ASSIGN_AS_ADMIN_FAILURE, user: "user" })).toEqual({
            updatingRole: false
        })
    })

    test("search request", () => {
        expect(user({}, { type: userConstants.SEARCH_REQUEST, })).toEqual({
            searching: true
        })
    })

    test("search success", () => {
        expect(user({}, { type: userConstants.SEARCH_SUCCESS, users: "users" })).toEqual({
            searching: false,
            searchResults: "users"
        })
    })

    test("search failure", () => {
        expect(user({}, { type: userConstants.SEARCH_FAILURE, })).toEqual({
            searching: false,
            searchResults: { data: [] }
        })
    })

    test("clear search result", () => {
        expect(user({}, { type: userConstants.CLEAR_SEARCH_RESULTS, })).toEqual({
            searching: false,
            searchResults: null
        })
    })

    test("invite reset", () => {
        expect(user({}, { type: userConstants.INVITE_RESET, })).toEqual({
            users: false
        })
    })

    test("fetch request", () => {
        expect(user({}, { type: userConstants.FETCH_REQUEST, })).toEqual({
            fetchingUsers: true
        })
    })

    test("fetch success", () => {
        expect(user({}, { type: userConstants.FETCH_SUCCESS, users: "users" })).toEqual({
            fetchingUsers: false,
            platformUsers: "users"
        })
    })

    test("fetch failure", () => {
        expect(user({}, { type: userConstants.FETCH_FAILURE, })).toEqual({
            fetchingUsers: false,
        })
    })

    test("fetch page request", () => {
        expect(user({}, { type: userConstants.FETCH_PAGE_REQUEST, })).toEqual({
            fetchingUsersPage: true
        })
    })

    test("fetch page success", () => {
        expect(user({}, { type: userConstants.FETCH_PAGE_SUCCESS, users: "users" })).toEqual({
            fetchingUsersPage: false,
            platformUsers: "users"
        })
    })

    test("fetch page failure", () => {
        expect(user({}, { type: userConstants.FETCH_PAGE_FAILURE, users: "users" })).toEqual({
            fetchingUsersPage: false,
        })
    })

    test("download request", () => {
        expect(user({}, { type: userConstants.DOWNLOAD_REQUEST, users: "users" })).toEqual({
            downloading: true
        })
    })

    test("download success", () => {
        expect(user({}, { type: userConstants.DOWNLOAD_SUCCESS, users: "users" })).toEqual({
            downloading: false
        })
    })

    test("download failure", () => {
        expect(user({}, { type: userConstants.DOWNLOAD_FAILURE, users: "users" })).toEqual({
            downloading: false
        })
    })
})
