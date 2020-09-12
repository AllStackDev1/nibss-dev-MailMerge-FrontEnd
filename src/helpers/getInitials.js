export function getInitials(fullname) {

    if (fullname) {
        fullname = fullname.replace(/[^a-zA-Z ]/g, "");
        let fractions = fullname.split(' ');
        return `${fractions[0] ? fractions[0].charAt(0) : ''}${fractions[1] ? fractions[1].charAt(0) : fractions[0] ? fractions[0].charAt(1) : ""}`.toUpperCase();
    }else{
        return 'NA';
    }
}