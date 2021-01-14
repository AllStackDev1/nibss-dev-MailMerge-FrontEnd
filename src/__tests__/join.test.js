import { join } from "../helpers/join"





it("should handle join function", () => {

    expect(join(["a", "b", "c", "d"])).toEqual("a / b / c / d")

})



