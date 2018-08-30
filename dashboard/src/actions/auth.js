import fetch from 'cross-fetch';
import { setEmailError, setPasswordError } from './login';

let authUrl = 'http://local-bastet.sendsteps.com/index.php';
// let authHash =  'da213sdasdas90dasdas';
let authHash =  '';
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

export function authLoading(authLoading) {
    return {
        type: 'AUTH_LOADING',
        authLoading
    }
}

export function checkAuthorized() {

    return dispatch => {
        dispatch(authRequired(true));
        fetch(authUrl,{
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: 'function=checkAuth&params='+authHash
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
export function authorizeLogin(email = '', password = '') {
    return dispatch => {
        if (email !== '' && password !== ''){
            dispatch(authRequired(true));
            fetch(authUrl,{
                method: 'POST',
                headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
                body: 'function=login&params='+email+'---'+password
            }).then(res => {
                return res.json()
            }).then(
                (result) => {
                    console.log(result)
                    if(result && typeof result.authorized !== 'undefined') {
                        dispatch(setAuthorized(result.authorized));
                    }
                },
                (error) => {
                    dispatch(setAuthorized(false));
                    dispatch(authRequired(false));
                }
            )
        } else {
            dispatch(setEmailError('Please enter a valid email'));
            dispatch(setPasswordError('Please enter a valid password'));
        }
    }
}