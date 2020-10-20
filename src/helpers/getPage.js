export function getPage(array, offset) {
    for (let i = 0; i < array.length; i++) {
        if (offset <= array[i].current.offsetHeight) {
            return {
                page: i,
                offset
            };
        } else {
            offset = offset - (array[i].current.offsetHeight + 50);
        }
    }
}
