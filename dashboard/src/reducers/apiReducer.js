export default function apiReducer(state, action) {

    switch(action.type) {
        case 'API_UPDATE_ERROR': {
            return {
                ...state,
                isLoading: false,
                updateError: action.updateError
            }
        }
        case 'API_UPDATE_SUCCESS': {
            return {
                ...state,
                updateError: null,
                isLoading: false
            }
        }
        case 'API_FETCH_ERROR': {
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        }
        case 'SIMULATE_LOADING': {
            return {
                ...state,
                isLoading: action.isLoading,
            }
        }
        case 'API_FETCH_SUCCESS': {
            return {
                ...state,
                error: null,
                isLoading: false,
            }
        }
        case 'CLEAR_ADDITIONAL_DATA': {
            return {
                ...state,
            }
        }
        case 'API_FETCH_ADDITIONAL_SUCCESS': {
            // @TODO Merge current additional data and action.additionalData perhaps?
            return {
                ...state,
                additionalData: action.additionalData
            }
        }
        case 'CLEAR_ERRORS': {
            return {
                ...state,
                isLoading: false,
                error: null
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}