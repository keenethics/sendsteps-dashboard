export default function apiReducer(state, action) {

    switch(action.type) {
        case 'API_FETCH_ERROR': {
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        }
        case 'API_FETCHING': {
            return {
                ...state,
                isLoading: true
            }
        }
        case 'API_FETCH_SUCCESS': {
            return {
                ...state,
                data: action.data,
                isLoading: false,
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}