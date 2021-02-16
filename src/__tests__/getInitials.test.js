import { getInitials } from "../helpers/getInitials"





it("should handle get initials function", () => {

    expect(getInitials(null)).toEqual("NA")

})


it("should return initials", () => {

    expect(getInitials("first name")).toEqual("FN")

})

it("should handle one first name", () => {

    expect(getInitials("first")).toEqual("FI")

})

it("should handle first name with space first", () => {

    expect(getInitials(" first")).toEqual("F")

})

