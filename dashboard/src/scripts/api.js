import fetch from 'cross-fetch';
import { getFromLocalStorage } from './localStorage';
import { getCookieValues } from './cookieStorage';

//const API_URL = process.env.NOVA_API_URL;
const API_URL = '/api';

const timeOutDuration = 10000; // ms

function timeOut(timeout, error, promise) {
  return new Promise((resolve, reject) => {
    promise.then(resolve, reject);
    setTimeout(reject.bind(null, error), timeOut);
  });
}

export function post(controller, functionName, params, onSuccess, onFail) {
  const token = getFromLocalStorage('token') || getCookieValues('SSTToken');

  const fetchParams = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(params)
  };

  fetch(`${API_URL}/${functionName}`, fetchParams)
    .then(result => result.json())
    .then(result => {
      if (result.error) {
        onFail(result);
      } else {
        onSuccess(result);
      }
    })
    .catch(error => {
      onFail(error);
    });
}

export function get(controller, functionName, params, onSuccess, onFail) {
  const token = getFromLocalStorage('token') || getCookieValues('SSTToken');

  const fetchParams = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  fetch(`${API_URL}/${functionName}`, fetchParams)
    .then(result => result.json())
    .then(result => {
      result.error && onFail(result);
      !result.error && onSuccess(result);
    })
    .catch(error => onFail(error));
}
