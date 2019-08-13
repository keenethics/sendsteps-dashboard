export function isValidEmail(email) {
    //from https://gist.github.com/badsyntax/719800
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( email );
}

export function isValidName(name) {
    return name.length > 1 && name.length < 255;
}

export function isValidPassword(password) {
    // Current rules

    // At least 6 characters

    // Suggested rules
    
    // Should probably have some other checks such as:
    // does it have a special character
    // uppercase/lowercase
    // numbers/characters mix
    
    return password.length >= 6 && password.length <= 255;
}

export function urlIsImage(url) {
    const supportedFiles = [
        '.jpeg',
        '.jpg',
        '.gif',
        '.png',
        '.bmp'
    ]

    if(url) {
        for(let x = 0; x < supportedFiles.length; x++) {
            if(url.endsWith(supportedFiles[x])) {
                return true
            }
        }
    }
    return false
}

export function isEqual(first, second) {
    return !!(first.length && second.length) && first === second;
}
/*
    Return Bootstrap 4 valid/invalid input classname
*/
export function getValidationState(value, validator) {
    return !!value.length ? (validator(value) ? " is-valid" : " is-invalid") : "";
}