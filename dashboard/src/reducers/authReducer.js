export default function apiReducer(state, action) {
    switch(action.type) {
        case 'SET_AUTHORIZED': {
            return {
                ...state,
                isAuthorized: action.isAuthorized,
            }
        }
        case 'AUTH_CHECKED': {
            return {
                ...state,
                authChecked: action.isChecked
            }
        }
        
        default: {
            return {
                ...state
            }
        }
    }
}