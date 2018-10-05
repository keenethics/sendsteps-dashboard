export function isValueInArray(value, list) {
    if(!value || !list) {
        return false;
    }
    return list.indexOf(value) > -1;
}