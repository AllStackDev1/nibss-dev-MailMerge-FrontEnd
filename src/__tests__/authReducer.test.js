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

})