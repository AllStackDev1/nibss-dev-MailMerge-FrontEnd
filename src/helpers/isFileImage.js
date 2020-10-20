export function isFileImage(code) {
    if (!code) {
        return false;
    }

    return code.split(";base64")[0]?.split("data:")[1]?.includes("image");
}
