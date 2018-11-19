
export default function surveyReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_DATA': {
            return {
                ...state,
                surveys: action.data
            }
        }
        case 'SET_SURVEY_DETAILS': {
            return {
                ...state,
                surveyDetails: action.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}