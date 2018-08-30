import fetch from 'cross-fetch';

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
    if (email !== '' && password !== ''){
        return dispatch => {
            dispatch(authRequired(true));
            fetch(authUrl,{
                method: 'POST',
                headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
                body: 'function=login&params='+email+'---'+password
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
    } else {
        return '';
        //return an error
    }
}