import { getInitials } from "../helpers/getInitials"





it("should handle get initials function", () => {

    expect(getInitials(null)).toEqual("NA")

})


it("should return initials", () => {

    expect(getInitials("first name")).toEqual("FN")

})

