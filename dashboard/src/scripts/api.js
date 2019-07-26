import fetch from 'cross-fetch';
import { getFromLocalStorage } from './localStorage';
import { getCookieValues } from './cookieStorage';

const API_URL = process.env.NOVA_API_URL;

const timeOutDuration = 10000 // ms

function timeOut(timeout, error, promise) {
    return new Promise((resolve, reject) => {
        promise.then(resolve, reject);
        setTimeout(reject.bind(null, error), timeOut)
    });
}

export function post(controller, functionName, params, onSuccess, onFail) {
    const token = getFromLocalStorage('token') || getCookieValues('SSTToken');
    const fetchParams = {
        method: 'POST',
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: 'controller='+controller+'&function='+functionName+'&params='+JSON.stringify(params)+'&token='+token
    }

    // timeOut(5, new Error('Request Timeout'), 
    fetch(API_URL, fetchParams)
    .then(result => result.json())
    .then(result => {
        if(result.error) {
            onFail(result.error);
        } else {
            onSuccess(result);
        }
    })
    .catch(error => onFail(error))
    // ) 
    
}

export function postNew(apiUrl, params, onSuccess, onFail) {
    // const token = getFromLocalStorage('token') || getCookieValues('SSTToken');
    const fetchParams = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
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
        body: 'controller='+controller+'&function='+functionName+'&params='+JSON.stringify(params)+'&token='+token
    }
    fetch(API_URL, fetchParams)
    .then(result => result.json())
    .then(result => {
        result.error && onFail(result);
        !result.error && onSuccess(result)
    })
    .catch(error => onFail(error))
}