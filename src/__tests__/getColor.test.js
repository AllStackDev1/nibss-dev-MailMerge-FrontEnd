import { getColor } from "../helpers/getColor"

describe("handle getcolor helper function", () => {
    it("should return correct color palette", () => {

        const colorPallete = ['#96ceb4', '#ff6f69', '#ffcc5c', '#88d8b0', '#0F5959', '#571845', '#900C3E', '#C70039', '#FF5733', '#FFC300']

        expect(getColor("BLACK")).toBe(colorPallete[1])

    })

})