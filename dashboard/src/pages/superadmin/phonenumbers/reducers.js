
export default function phonenumberReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_PHONENUMBER_DATA': {
            return {
                ...state,
                phonenumbers: action.data
            }
        }
        case 'SET_KEYWORDS': {
            return {
                ...state,
                phonenumberKeywords: action.data
            }
        }
        case 'SET_PHONENUMBER': {
            return {
                ...state,
                selectedPhonenumber: action.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}