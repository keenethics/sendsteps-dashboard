import store from '../store.js';
import fetch from 'cross-fetch';

let authUrl = 'http://local-bastet.sendsteps.com/index.php';

export function setAuthorized(isAuthorized) {
    return {
        type: 'SET_AUTHORIZED',
        isAuthorized
    }
}

export function authRequired(isRequired) {
    return {
        type: 'AUTH_REQUIRED',
        isRequired
    }
}

export function checkAuthorized() {

    return dispatch => {
        dispatch(authRequired(true));
        fetch(authUrl,{
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"}
        }).then(res => {
            return res.json()
        }).then(
            (result) => {
                if(result && typeof result.authorized !== 'undefined') {
                    dispatch(setAuthorized(result.authorized));
                }
            },
            (error) => {
                dispatch(setAuthorized(false));
                dispatch(authRequired(false));
            }
        )
    }

    

    
}