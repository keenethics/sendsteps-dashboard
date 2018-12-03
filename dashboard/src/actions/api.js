import fetch from 'cross-fetch';
import { getFromLocalStorage } from './../scripts/localStorage';
import { getCookieValues } from './../scripts/cookieStorage';
import { toast } from 'react-toastify';

let apiUrl = process.env.NOVA_API_URL;

export function setNewData(newData) {
    return {
        type: 'SET_DATA',
        newData
    }
}

export function apiUpdateSuccess() {
    toast("Update success!");
    return {
        type: 'API_UPDATE_SUCCESS',
    }
}

export function apiUpdateError(updateError) {
    toast("Unable to update.");
    return {
        type: 'API_UPDATE_ERROR',
        updateError
    }
}

export function apiFetchError(error) {
    toast("Unable to fetch data.");
    return {
        type: 'API_FETCH_ERROR',
        error
    }
}

export function callAPI(controller = '', functionName = '', apiParams = '', onFail = null) {
    const token = getFromLocalStorage('token') || getCookieValues('SSTToken');

    const fetchParams = {
        method: 'POST',
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: 'controller='+controller+'&function='+functionName+'&params='+apiParams+'&token='+token
    }

    return dispatch => {
        fetch(apiUrl, fetchParams)
        .then(
            result => { 
                return result.json()
            })
        .then(
            result => {
                if(result.error) {
                    toast("Something went wrong.");
                    dispatch(onFail);
                }
            },
            error => {
                toast("Something went wrong.");
                dispatch(onFail);
            }
        )
    }
}

export function updateAPI(controller = '', functionName = '', apiParam = '') {

    const token = getFromLocalStorage('token') || getCookieValues('SSTToken');
    return dispatch => {
        dispatch(simulateLoading(true));
        fetch(apiUrl,{
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: 'controller='+controller+'&function='+functionName+'&params='+apiParam+'&token='+token
        }).then(res => {
            return res.json()
        }).then(
            (result) => {
                try {
                    if(result.error) {
                        dispatch(apiUpdateError(result.error));
                    } else {
                        // AUTH Call successful, result should have a key, add that to either localstorage or cookies,
                        // if neither of these are available, don't let the user login and dispatch an error
                        dispatch(apiUpdateSuccess(result.content));  
                    }
                } catch (error) {
                    dispatch(apiUpdateError(error));
                }
            },
            // Note: It is important to handle errors
            // instead of a catch() block so that we don't swallow exceptions from actual bugs in components.
            (error) => {
                // Dispatch error as an action. 
                // error is accessible through mapStateToProps -> apiReducer.error
                // (Maybe rename to apiError or something)
                dispatch(apiFetchError(error));
            }
        )
        dispatch(simulateLoading(false));
    }
}

export function simulateLoading(isLoading) {
    return {
        type: 'SIMULATE_LOADING',
        isLoading
    }
}

export function apiFetchSuccess() {
    return {
        type: 'API_FETCH_SUCCESS',
    }
}

export function clearErrors() {
    return {
        type: 'CLEAR_ERRORS'
    }
}

export function fetchResult(controller = '', functionName = '', apiParam = '', callBack = null) {
    
    const token = getFromLocalStorage('token') || getCookieValues('SSTToken');
    
    return dispatch => {
        dispatch(simulateLoading(true));
        fetch(apiUrl,{
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: 'controller='+controller+'&function='+functionName+'&params='+apiParam+'&token='+token
        }).then(res => {
            return res.json()
        }).then(
            (result) => {
                try {
                    if(result.error) {
                        dispatch(apiFetchError(result.error));
                    } else {
                        // AUTH Call successful, result should have a key, add that to either localstorage or cookies,
                        // if neither of these are available, don't let the user login and dispatch an error
                        dispatch(apiFetchSuccess());
                        if(typeof callBack === "function") {
                            dispatch(callBack(result.content));
                        }
                    }
                } catch (error) {
                    dispatch(apiFetchError(error));
                }
            },
            // Note: It is important to handle errors
            // instead of a catch() block so that we don't swallow exceptions from actual bugs in components.
            (error) => {
                // Dispatch error as an action. 
                // error is accessible through mapStateToProps -> apiReducer.error
                // (Maybe rename to apiError or something)
                dispatch(apiFetchError(error));
            }
        )
        dispatch(simulateLoading(false));
    }
}


    
