export default function apiReducer(state, action) {
    switch(action.type) {
        case 'SET_AUTHORIZED': {
            return {
                ...state,
                isAuthorized: action.isAuthorized,
            }
        }
        case 'AUTH_REQUIRED': {
            return {
                ...state,
                authRequired: action.isRequired
            }
        }

        case 'AUTH_LOADING': {
            return {
                ...state,
                authLoading: action.authLoading
            }
        }
        
        default: {
            return {
                ...state
            }
        }
    }
}