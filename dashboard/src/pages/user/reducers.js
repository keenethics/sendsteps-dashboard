
export default function userReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_USER_PROFILE_DATA': {
            return {
                ...state,
                userDetails: action.data
            }
        }
        case 'SET_ACCOUNT_PROFILE_DATA': {
            return {
                ...state,
                accountDetails: action.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}