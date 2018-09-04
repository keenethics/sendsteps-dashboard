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
                isAuthRequired: action.isAuthRequired
            }
        }
        case 'AUTH_LOADING': {
            return {
                ...state,
                authLoading: action.authLoading
            }
        }
        case 'SECURITY_ERROR': {
            return {
                ...state,
                securityError: action.securityError
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}