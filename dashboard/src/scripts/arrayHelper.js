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
    const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let text = "";
    while(text.length !== keyLength) {
        text += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return text;
}

export function swap(theList, firstIndex, secondIndex) {
    let placeholder = theList[firstIndex];
    theList[firstIndex] = theList[secondIndex];
    theList[secondIndex] = placeholder;
    return theList
}

export function firstOfObject(theObject) {
    return theObject[Object.keys(theObject)[0]];
}

export function lastOfObject(theObject) {
    return theObject[Object.keys(theObject)[Object.keys(theObject).length -1]];
}

export function valuesToString(theObject) {
    Object.keys(theObject).forEach(key => {
        theObject[key] = theObject[key].toString();
    })
    return theObject;
}