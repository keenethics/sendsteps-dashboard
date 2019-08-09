import fetch from 'cross-fetch';
import { getFromLocalStorage } from './localStorage';
import { getCookieValues } from './cookieStorage';
import { formatTypes } from './arrayHelper';

const API_URL_PHP = process.env.NOVA_API_URL;
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
  const phpBody = controller && ('controller='+controller+'&function='+functionName+'&params='+JSON.stringify(params)+'&token='+token);
  const apiUrl = phpBody && API_URL_PHP || `${API_URL}/${functionName}`;
  const isFormData = params instanceof FormData;
  const contentType = isFormData ? {} : { 'Content-Type': 'application/json' };

  const fetchParams = {
    method: 'POST',
    headers: { ...contentType, Authorization: `Bearer ${token}` },
    body: phpBody || (isFormData ? params : JSON.stringify(params))
  };

  fetch(apiUrl, fetchParams)
    .then(result => result.json())
    .then(result => {
      if (result.error) {
        onFail(result);
      } else {
        onSuccess(formatTypes(result));
      }
    })
    .catch(error => {
      onFail(error);
    });
}

export function postNew(apiUrl, params, onSuccess, onFail) {
  // const token = getFromLocalStorage('token') || getCookieValues('SSTToken');
  const fetchParams = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  };

  fetch(apiUrl, fetchParams)
    .then(result => result.json())
    .then(result => {
        if(result.error) {
            onFail(result.error);
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
  const phpBody = controller && ('controller='+controller+'&function='+functionName+'&params='+JSON.stringify(params)+'&token='+token);
  const apiUrl = phpBody && API_URL_PHP || `${API_URL}/${functionName}`;

  const fetchParams = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: phpBody
  };
  fetch(apiUrl, fetchParams)
    .then(result => result.json())
    .then(result => {
      if (result.error) {
        return onFail(result);
      }
      onSuccess(formatTypes(result));
    })
    .catch(error => onFail(error));
}

export function getNew(apiUrl, params, onSuccess, onFail) {
  const token = getFromLocalStorage('token') || getCookieValues('SSTToken');

  const fetchParams = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  fetch(apiUrl, fetchParams)
    .then(result => result.json())
    .then(result => {
        result.error && onFail(result);
        !result.error && onSuccess(result)
    })
    .catch(error => onFail(error));
}
