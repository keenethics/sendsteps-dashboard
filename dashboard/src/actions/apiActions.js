import store from '../store.js'
import fetch from 'cross-fetch';

let apiUrl =  'http://local-nova.sendsteps.com/index.php';

export function apiFetchError(error) {
    // console.log('API Fetch error!', error);
    return {
        type: 'API_FETCH_ERROR',
        error
    }
}

export function simulateLoading() {
    return {
        type: 'START_LOADING'
    }
}

export function simulateLoadingDone() {
    return {
        type: 'STOP_LOADING'
    }
}

export function apiFetchSuccess(data) {
    // console.log('API Fetch success!', data);
    return {
        type: 'API_FETCH_SUCCESS',
        data
    }
}

export function clearErrors() {
    return {
        type: 'CLEAR_ERRORS'
    }
}

export function fetchResult(controller = '', functionName = '', apiParam = '') {
    return dispatch => {
        dispatch(simulateLoading());
        fetch(apiUrl,{
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: 'controller='+controller+'&function='+functionName+'&params='+apiParam
        }).then(res => {
            return res.json()
        }).then(
            (result) => {
                try {
                    if(result.error) {
                        dispatch(apiFetchError(result.error));
                    } else {
                        dispatch(apiFetchSuccess(JSON.parse(result.content)));  
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
    }
}


    
