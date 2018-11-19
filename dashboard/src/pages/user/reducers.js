
export default function userReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_DATA': {
            return {
                ...state,
                profileDetails: action.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}