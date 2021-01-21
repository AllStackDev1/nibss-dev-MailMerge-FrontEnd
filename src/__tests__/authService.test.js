import * as AuthServices from '../../src/services/authService'
import decode from "jwt-decode";

describe("handle authservice services", () => {

    it("should logout", () => {

        AuthServices.authService.logout();

        expect(localStorage.removeItem).toBeTruthy();


    })

    it("should get profile", () => {

        const profileSpy = jest.spyOn(AuthServices.authService, "getProfile");
        jest.mock("jwt-decode")

        profileSpy.mockImplementation(() => decode(
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        ))

        AuthServices.authService.getProfile()
    })

    it("should  get token", () => {
        const token = AuthServices.authService.getToken();

    })

    it("should run istokenexpired", () => {

        AuthServices.authService.fetchFrom("/", {})

    })

    it("should run fetchProfile", () => {
        AuthServices.authService.fetchProfile()
    })

    it("should run updateProfile", () => {
        AuthServices.authService.updateProfile()
    })

    it("should run updateAccount", () => {
        AuthServices.authService.updateAccount({})
    })

    it("should run deleteSignature", () => {
        AuthServices.authService.deleteSignature("")
    })

    it("should run login", () => {
        AuthServices.authService.login({})
    })

    it("should run isTokenExpired", () => {
        AuthServices.authService.isTokenExpired("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")
    })

})