export function join(values) {
    const valuesArray = []

    values.forEach(element => {
        if (element) {
            valuesArray.push(element);
        }
    });

    return valuesArray.join(" / ");
}
