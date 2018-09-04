import fetch from 'cross-fetch';
import { setEmailError, setPasswordError } from './login';
import { addToLocalStorage } from '../scripts/localStorage';
import { addCookieValues } from '../scripts/cookieStorage';

let authUrl = 'http://local-bastet.sendsteps.com/index.php';

export function setAuthorized(isAuthorized) {
    return {
        type: 'SET_AUTHORIZED',
        isAuthorized
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

export function checkAuthorized(authHash = '') {

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
                console.log(authHash)
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

export function securityError(securityError) {
    return {
        type: 'SECURITY_ERROR',
        securityError
    }
}

export function authorizeLogin(email = '', password = '') {
    return dispatch => {
        if (email !== '' && password !== ''){
            let params = JSON.stringify({
                email: email, 
                password: password
            });
            
            dispatch(authRequired(true));
            fetch(authUrl,{
                method: 'POST',
                headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
                body: 'function=login&params='+params
            }).then(res => {
                return res.json()
            }).then(
                (result) => {
                    if(result && typeof result.authorized !== 'undefined') {
                        // USER IS AUTHORIZED HERE
                        // Add key to localStorage, or Cookies, if failed to do both,
                        // redirect to login page with security warning
                        if(!addToLocalStorage('token',result.token)) {
                            if(!addCookieValues('SSTToken', result.token, 48)) {
                                dispatch(securityError('Unable to save user key to LocalStorage/Cookies, please enable these settings in your browser before logging in.'))
                                return;
                            }
                        }
                        dispatch(setAuthorized(result.authorized));
                    }
                },
                (error) => {
                    console.log(error)
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

// export function register(email = '', password = '', firstName = '', lastName = '', termsAccepted = false) {
//     return dispatch => {
//         if (email !== '' && password !== ''){
//             dispatch(authRequired(true));
//             fetch(authUrl,{
//                 method: 'POST',
//                 headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
//                 body: 'function=register&params='+email+'---'+password
//             }).then(res => {
//                 return res.json()
//             }).then(
//                 (result) => {
//                     if(result && typeof result.authorized !== 'undefined') {
//                         // USER IS AUTHORIZED HERE
//                         // Add key to localStorage, or Cookies, if failed to do both,
//                         // redirect to login page with security warning
//                         if(!addToLocalStorage('token',result.token)) {
//                             if(!addCookieValues('SSTToken', result.token, 48)) {
//                                 dispatch(securityError('Unable to save user key to LocalStorage/Cookies, please enable these settings in your browser before logging in.'))
//                                 return;
//                             }
//                         }
//                         dispatch(setAuthorized(result.authorized));
//                     }
//                 },
//                 (error) => {
//                     console.log(error)
//                     dispatch(setAuthorized(false));
//                     dispatch(authRequired(false));
//                 }
//             )
//         } else {
//             dispatch(setEmailError('Please enter a valid email'));
//             dispatch(setPasswordError('Please enter a valid password'));
//         }
//     }
// }