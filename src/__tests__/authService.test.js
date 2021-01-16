import * as AuthServices from '../../src/services/authService'
import decode from "jwt-decode";
// {
//     login,
//     logout,
//     loggedIn,
//     fetchFrom,
//     getProfile,
//     getToken,
//     fetchProfile,
//     updateProfile,
//     updateAccount,
//     deleteSignature
// }

describe("handle authservice services", () => {

    it("should logout", () => {

        AuthServices.authService.logout();

        expect(localStorage.removeItem).toBeTruthy();


    })

    it("should get profile", () => {

        const profileSpy = jest.spyOn(AuthServices.authService, "getProfile");
        jest.mock("jwt-decode")

        // const tokenMock = jest.spyOn(AuthServices.authService, "getToken")

        // tokenMock.mockImplementation(() => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")
        profileSpy.mockImplementation(() => decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"))
        // profileSpy.mockImplementation(() => AuthServices.authService.getToken())

        AuthServices.authService.getProfile()
        // AuthServices.authService.getToken()

        // expect(decode).toBeCalled();

    })

    it("should  get token", () => {

        console.log(AuthServices.authService);

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