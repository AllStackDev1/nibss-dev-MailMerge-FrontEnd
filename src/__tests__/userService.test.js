import * as UserServices from '../../src/services/userService'


it("should run invite without error", () => {

    UserServices.userService.invite([{ administrator: "", role: "" }])
})

it("should run edit without error", () => {

    UserServices.userService.edit("user")
})

it("should run deleteUser without error", () => {

    UserServices.userService.deleteUser("user")
})

it("should run updateRole without error", () => {

    UserServices.userService.updateRole("user")
})

it("should run fetch without error", () => {

    UserServices.userService.fetch()
})

it("should run fetchPage without error", () => {

    UserServices.userService.fetchPage("page")
})

it("should run search without error", () => {

    UserServices.userService.search("search text", "filter")
})