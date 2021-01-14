import { isFileImage } from "../helpers/isFileImage"





it("should handle isFileImage function", () => {

    expect(isFileImage()).toBeFalsy();

})


it("should return initials", () => {

    expect(isFileImage("code")).toBeUndefined();

})