import { getPage } from "../helpers/getPage"



describe("handle build query function", () => {

    it("should get page value with less offset", () => {

        const arrayNum = [{ current: { offsetHeight: 100 } }]
        const offset = 20

        expect(getPage(arrayNum, offset)).toEqual({ "offset": 20, "page": 0 })

    })

    it("should get page value with greater offset", () => {

        const arrayNum = [{ current: { offsetHeight: 100 } }]
        const offset = 200

        expect(getPage(arrayNum, offset)).toBe(undefined)

    })

})
