export function getInitials(fullname) {
    if (fullname) {
        fullname = fullname.replace(/[^a-zA-Z ]/g, "");
        const fractions = fullname.split(' ');
        
        const firstCharacter = fractions[0] ? fractions[0].charAt(0) : '';
        const secondCharacter = fractions[1]?.charAt(0) || fractions[0]?.charAt(1);

        return `${firstCharacter}${secondCharacter}`.toUpperCase();
    }else{
        return 'NA';
    }
}