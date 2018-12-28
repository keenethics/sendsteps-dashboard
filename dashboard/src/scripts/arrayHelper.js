export function isValueInArray(value, list) {
    if(!value || !list) {
        return false;
    }
    return list.indexOf(value) > -1;
}

export function formatLabelsToKeyValuePairs(labels, data) {
    if(!data || !labels) {
        return;
    }
    let formatted = [];
    data.forEach(result => {
        let newObj = {};
        result.forEach((value, index) => {
            newObj.id = index;
            newObj[labels[index]] = value;
        })
        formatted.push(newObj);
    })
    return formatted;
}

export function generateKey() {
    const keyLength = 10
    const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";
    while(text.length !== keyLength) {
        text += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return text;
}