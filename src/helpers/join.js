export function join(values) {
    let valuesArray = []

    values.forEach(element => {
        if (element) {
            valuesArray.push(element);
        }
    });

    return valuesArray.join(" / ");
}