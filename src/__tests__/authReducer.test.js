import { authConstants } from "../constants"
import auth from "../reducers/authReducer"



describe("auth reducer", () => {

    test("empty state", () => {
        expect(auth(undefined)).toEqual({
            loggingIn: false,
            uploading: false,
            updatingProfile: false
        })
    })

    test("login", () => {
        expect(auth({}, { type: authConstants.LOGIN_REQUEST, user: "user" })).toEqual({
            loggingIn: true,
            user: "user"
        })
    })

    test("login success", () => {
        expect(auth({}, { type: authConstants.LOGIN_SUCCESS, user: "user" })).toEqual({
            loggedIn: true,
            loggingIn: false,
            user: "user"
        })
    })

    test("login failure", () => {
        expect(auth({}, { type: authConstants.LOGIN_FAILURE })).toEqual({
            loggingIn: false,
        })
    })

    test("update profile", () => {
        expect(auth({}, { type: authConstants.START_UPDATE_PROFILE })).toEqual({
            updatingProfile: true,
        })
    })

    test("update profile success", () => {
        expect(auth({}, { type: authConstants.UPDATE_PROFILE_SUCCESS, profile: "profile" })).toEqual({
            updatingProfile: false,
            profile: "profile"
        })
    })

    test("update profile failure", () => {
        expect(auth({}, { type: authConstants.UPDATE_PROFILE_FAILURE })).toEqual({
            updatingProfile: false
        })
    })

    test("start fetch profile", () => {
        expect(auth({}, { type: authConstants.START_FETCH_PROFILE })).toEqual({
            fetchingProfile: true
        })
    })

    test("fetch profile success", () => {
        expect(auth({}, { type: authConstants.FETCH_PROFILE_SUCCESS, profile: "profile" })).toEqual({
            fetchingProfile: false,
            profile: "profile"
        })
    })

    test("fetch profile failure", () => {
        expect(auth({}, { type: authConstants.FETCH_PROFILE_FAILURE })).toEqual({
            fetchingProfile: false,
        })
    })

    test("start delete signature", () => {
        expect(auth({}, { type: authConstants.START_DELETE_SIGNATURE, signature: "signature" })).toEqual({
            deletingSignature: "signature"
        })
    })

    test("delete signature success", () => {
        expect(auth({}, { type: authConstants.DELETE_SIGNATURE_SUCCESS, profile: "profile" })).toEqual({
            deletingSignature: false,
            profile: "profile"
        })
    })

    test("delete signature failure", () => {
        expect(auth({}, { type: authConstants.DELETE_SIGNATURE_FAILURE, })).toEqual({
            deletingSignature: false,
        })
    })

    test("upload start", () => {
        expect(auth({}, { type: authConstants.UPLOAD_START, })).toEqual({
            uploading: true,
            uploaded: 0
        })
    })

    test("upload progress", () => {
        expect(auth({}, { type: authConstants.UPLOAD_PROGRESS, loaded: 5 })).toEqual({
            uploading: true,
            uploadProgress: 5
        })
    })

    test("upload suuccess", () => {
        expect(auth({}, { type: authConstants.UPLOAD_SUCCESS, add: true })).toEqual({
            uploading: false,
            uploaded: 1,
            add: true
        })
    })

    test("upload error", () => {
        expect(auth({}, { type: authConstants.UPLOAD_ERROR, })).toEqual({
            uploading: false,
            uploadProgress: 0
        })
    })

    test("reset upload", () => {
        expect(auth({}, { type: authConstants.RESET_UPLOAD, })).toEqual({
            uploading: false,
            uploaded: 0,
            add: false
        })
    })

})
