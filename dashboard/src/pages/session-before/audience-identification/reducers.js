
export default function audienceReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_IDENTIFICATION_DETAILS': {
            return {
                ...state,
                identificationDetails: action.identificationDetails
            }
        }
        case 'SET_DELETE_IDENTIFICATION_QUESTION_ID': {
            return {
                ...state,
                deleteIdentificationQuestionId: action.deleteIdentificationQuestionId
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}