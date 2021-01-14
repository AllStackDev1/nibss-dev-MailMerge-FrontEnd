import { buildQuery } from "../helpers/buildQuery"



describe("handle build query function", () => {

    it("should return string data", () => {

        expect(buildQuery("random data")).toEqual("random data")

    })

    it("should return & strings for objects", () => {

        expect(buildQuery({ a: "abc", c: "123" })).toEqual("a=abc&c=123")

    })

})
