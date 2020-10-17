export function getImageSize(img) {
    return new Promise((resolve, reject) => {
        var newImg = new Image();

        newImg.onload = function () {
            var height = newImg.height;
            var width = newImg.width;

            resolve({
                width,
                height
            });
        }

        newImg.onerror = reject

        newImg.src = img.src;
    })
}
