export default function apiReducer(state, action) {
    switch(action.type) {
        case 'CLEAR_DATA': {
            return {
                ...state,
                data: {}
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
                data: action.data,
                error: null,
                isLoading: false,
            }
        }
        case 'CLEAR_ADDITIONAL_DATA': {
            return {
                ...state,
                additionalData: null
            }
        }
        case 'API_FETCH_ADDITIONAL_SUCCESS': {
            // @TODO Merge current additional data and action.additinalData perhaps?
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