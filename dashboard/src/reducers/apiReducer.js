export default function apiReducer(state, action) {
    switch(action.type) {
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