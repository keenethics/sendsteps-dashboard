
export default function audienceReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_DATA': {
            return {
                ...state,
                phonenumbers: action.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}