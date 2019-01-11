
export default function userManageReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_DELETE_USERS_DATA': {
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