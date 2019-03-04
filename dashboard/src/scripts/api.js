import { getFromLocalStorage } from './localStorage';
import { getCookieValues } from './cookieStorage';

const apiUrl = process.env.NOVA_API_URL;

export function post(controller, functionName, params, onSuccess, onFail) {
    const token = getFromLocalStorage('token') || getCookieValues('SSTToken');
    const fetchParams = {
        method: 'POST',
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: 'controller='+controller+'&function='+functionName+'&params='+params+'&token='+token
    }
    fetch(apiUrl, fetchParams)
    .then(result => result.json())
    .then(result => {
        if(result.error) {
            onFail(result.error);
        } else {
            onSuccess(result);
        }
    })
    .catch(error => onFail(error))
}

// Gets are weird because we are sending params in the body since the API expexts that
// How to Get without being able to send body params? (Backend thing)
export function get(controller, functionName, params, onSuccess, onFail) {

    // Make up URL with params instead of body tag

    const token = getFromLocalStorage('token') || getCookieValues('SSTToken');
    const fetchParams = {
        method: 'POST',
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: 'controller='+controller+'&function='+functionName+'&params='+params+'&token='+token
    }
    fetch(apiUrl, fetchParams)
    .then(result => result.json())
    .then(result => {
        result.error && onFail(result);
        !result.error && onSuccess(result)
    })
    .catch(error => onFail(error))
}