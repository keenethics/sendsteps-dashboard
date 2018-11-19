
export default function userManageReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_DATA': {
            return {
                ...state,
                userList: action.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}