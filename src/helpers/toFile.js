export function toFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n >= 0) {
        u8arr[n] = bstr.charCodeAt(n);

        n = n - 1;
    }

    return new File([u8arr], filename, { type: mime });
}