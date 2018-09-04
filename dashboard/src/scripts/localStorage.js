export function localStorageIsAccesible() {
    try {
        const localStorage =  window.localStorage;
        const storageTest = '__StorageTest';
        localStorage.setItem(storageTest, storageTest);
        // console.log('LocalStorage is accessible!');
        localStorage.removeItem(storageTest);
        return true;
    } catch (error) {
        console.log('LocalStorage is not accessible');
        return false;
    }
}

export function addToLocalStorage(key, value) {
    if(localStorageIsAccesible()) {
        const localStorage = window.localStorage;
        localStorage.setItem(key, value);
        const storedItem = getFromLocalStorage(key);
        if(storedItem && typeof storedItem !== 'undefined') {
            // console.log('Added item to storage: ' + storedItem);
            return storedItem;
        }
    }
    console.log('Unable to add item to localStorage');
    return false;
}

export function getFromLocalStorage(key) {
    if(localStorageIsAccesible()) {
        const storedObject = window.localStorage.getItem(key);
        if(storedObject && typeof storedObject !== 'undefined') {
            // console.log('Returning storedObject:' + storedObject);
            return storedObject;
        }
    }
    console.log('Unable to get key: ' + key + ' from localStorage');
    return false;
}

export function removeFromLocalStorage(key) {
    if(localStorageIsAccesible()) {
        if(getFromLocalStorage(key)) {
            window.localStorage.removeItem(key);
            if(!getFromLocalStorage(key)) {
                // console.log('Removed item: ' + key + ' from localStorage');
                return true;
            }
        }
    }
    console.log('Unable to remove key: ' + key + ' from localStorage');
    return false;
}