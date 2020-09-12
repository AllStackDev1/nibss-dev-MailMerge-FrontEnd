export function getColor(fullname) {
    if (fullname) {
        var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var colorpalette = ['#96ceb4', '#ff6f69', '#ffcc5c', '#88d8b0', '#0F5959', '#571845', '#900C3E', '#C70039', '#FF5733', '#FFC300'];

        return colorpalette[alphabet.indexOf(fullname.charAt(0).toUpperCase()) % 10];
    } else {
        return '#000';
    }
}