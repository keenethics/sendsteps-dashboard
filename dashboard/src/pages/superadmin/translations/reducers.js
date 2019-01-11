
export default function translationReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_TRANSLATION_DATA': {
            return {
                ...state,
                translations: action.data
            }
        }
        case 'SET_TRANSLATION_DETAILS': {
            return {
                ...state,
                translationDetails: action.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}