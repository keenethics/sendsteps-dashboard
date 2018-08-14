import store from '../store.js'

let apiUrl =  'http://local-nova.sendsteps.com/index.php';

export function apiFetchError(error) {
    // console.log('API Fetch error!', error);
    return {
        type: 'API_FETCH_ERROR',
        error
    }
}

export function apiFetching() {
    // console.log('fetching from API!');
    return {
        type: 'API_FETCHING',
    }
}

export function apiFetchSuccess(data) {
    // console.log('API Fetch success!', data);
    return {
        type: 'API_FETCH_SUCCESS',
        data
    }
}

export function fetchResult(controller = '', functionName = '', apiParam = '') {
    store.dispatch(apiFetching());
    // setTimeout(() => {
        fetch(apiUrl,{
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: 'controller='+controller+'&function='+functionName+'&params='+apiParam
        }).then(res => {
            // console.log(res);
            return res.json()
        }).then(
            (result) => {
                // console.log(result);
                if (result.error) {
                    store.dispatch(apiFetchError((result.error)));
                } else {
                    store.dispatch(apiFetchSuccess(JSON.parse(result.content)));  
                }
               
            // store.dispatch(apiFetchSuccess(JSON.parse(result.content)));
            },
            // Note: It is important to handle errors
            // instead of a catch() block so that we don't swallow exceptions from actual bugs in components.
            (error) => {
                // Dispatch error as an action. 
                // error is accessible through mapStateToProps -> apiReducer.error
                // (Maybe rename to apiError or something)
                store.dispatch(apiFetchError(error));
            }
        )
    // },1000)
    
}


    
