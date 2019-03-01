import { toast } from 'react-toastify';

export function setNewData(newData) {
    return {
        type: 'SET_DATA',
        newData
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