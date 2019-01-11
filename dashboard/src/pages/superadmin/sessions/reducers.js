
export default function sessionOverviewReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_SESSION_DATA': {
            return {
                ...state,
                sessionData: action.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}