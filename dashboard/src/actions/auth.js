import fetch from 'cross-fetch';
import 'whatwg-fetch';
import { addToLocalStorage, removeFromLocalStorage } from '../scripts/localStorage';
import { addCookieValues, removeCookieValues } from '../scripts/cookieStorage';
import { toast } from 'react-toastify';

let authUrl = process.env.AUTH_API_URL;

export function setAuthorized(isAuthorized) {
    return {
        type: 'SET_AUTHORIZED',
        isAuthorized
    }
}

export function setUser(currentUser) {
    return {
        type: 'SET_USER',
        currentUser
    }
}

export function authRequired(isAuthRequired) {
    return {
        type: 'AUTH_REQUIRED',
        isAuthRequired
    }
}

export function authLoading(authLoading) {
    return {
        type: 'AUTH_LOADING',
        authLoading
    }
}

export function checkAuthorized(token = '') {
    return dispatch => {
        let params = JSON.stringify({
            token: token
        });
        dispatch(authRequired(true));
        fetch(authUrl,{
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: 'function=checkAuth&params='+params
        }).then(res => {
            return res.json()
        }).then(
            (result) => {
                
                if(result && typeof result.authorized !== 'undefined') {
                    dispatch(setAuthorized(result.authorized));
                    dispatch(setUser(result));
                }
            },
            (error) => {
                dispatch(setAuthorized(false));
                dispatch(authRequired(false));
            }
        )
    }
}

export function securityError(securityError) {
    return {
        type: 'SECURITY_ERROR',
        securityError
    }
}

export function setGeneralError(generalError) {
    return {
        type: 'GENERAL_ERROR',
        generalError
    }
}

export function signOut() {
    return dispatch => {
        removeFromLocalStorage('token');
        removeCookieValues('SSTToken');
        dispatch(setAuthorized(false));
        dispatch(authRequired(null));
    }
}

export function register(firstName, lastName, email, password, passwordConfirm, termsAccepted, onSuccess, onFail) {
    const registerParams = JSON.stringify({
        email,
        password,
        passwordConfirm,
        options: {
            firstName,
            lastName,
            termsAccepted,
        }
    });

    fetch(authUrl,{
        method: 'POST',
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: 'function=register&params='+registerParams
    })
    .then(result => result.json())
    .then(result => {
        console.log(result)
        if(result.error) {
            console.log(result.error);
        }
        },
        (error) => {
            console.log(error);
        }
    )
}


export function authenticate(email, password, onSuccess, onFail) {
    const params = JSON.stringify({email: email, password: password});
    fetch(authUrl, 
        {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: 'function=login&params='+params
        }
    )
    .then(result => result.json())
    .then(result => {
        if(result && typeof result.authorized !== 'undefined') {
            toast("Logged in as " + email);
            if(!addToLocalStorage('token',result.token)) {
                if(!addCookieValues('SSTToken', result.token, 48)) {
                    onFail('Unable to save user key to LocalStorage/Cookies, please enable these settings in your browser before logging in.')
                    return;
                }
            }
            onSuccess(result)
        }
    },
    error => onFail(error))
}
