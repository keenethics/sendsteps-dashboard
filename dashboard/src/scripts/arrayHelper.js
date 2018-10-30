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