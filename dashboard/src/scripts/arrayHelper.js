import { isObject, isNull } from 'util';


export function isValueInArray(value, list) {
    if(!value || !list) {
        return false;
    }
    return list.indexOf(value) !== -1;
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

export function itemPropsToString(item, property) {
    return item && item[property] ? item[property] : ""
}

/*
    Recursive function for parsing Object identifier values to integers
    { userId : "1337", items : [{ id: "123" }] } will become:
    { userId : 1337, items : [{ id: 123 }] }
*/

export function formatTypes(dataObject) {
    if(!(typeof dataObject === 'string')) {
        Object.keys(dataObject).forEach(item => {
            const currentItem = dataObject[item];
            dataObject[item] = (isNaN(currentItem) || !currentItem || !currentItem.length) ? currentItem : currentItem >> 0
            if(isObject(currentItem) && !isNull(currentItem) && !!Object.keys(currentItem).length) {
                dataObject[item] = formatTypes(currentItem);
            }
        })
    }
    return dataObject;
}

export function idToAssociative(list) {
    let assocList = []
    list.forEach(item => {
        const itemId = item.id;
        delete item.id;
        assocList[itemId] = {...item}
    });
    return assocList;
}

export function swapOrder(list, property, sourceOrder, destinationOrder) {
    let newList = [ ...list ];
    const placeholder = newList.splice(sourceOrder - 1, 1)[0]
    placeholder[property] = destinationOrder

    newList.forEach((question, index) => {
        let newOrder = index + 1
        if(newOrder >= destinationOrder) {
            newOrder = index + 2
        }
        question[property] = newOrder
    })
    newList.push(placeholder)
    return newList;
}

export function sortByProperty(property, list) {
    return list.sort((a, b) =>     {
        return a[property] - b[property];
    })
}