import { getImageSize } from "../helpers/getImageSize"
import image from "../images/document.png"

it("should get image size", () => {

    expect(getImageSize(image)).toBe({})

})