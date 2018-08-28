export default function apiReducer(state, action) {
    switch(action.type) {
        case 'API_FETCH_ERROR': {
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        }
        case 'START_LOADING': {
            return {
                ...state,
                isLoading: true,
            }
        }
        case 'STOP_LOADING': {
            return { 
                ...state,
                isLoading: false,
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