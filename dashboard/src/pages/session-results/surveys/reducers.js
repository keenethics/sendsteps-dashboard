
export default function surveyResultsReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_SURVEY_RESULTS_DATA': {
            return {
                ...state,
                surveyResults: action.data
            }
        }
        case 'SET_DETAILS': {
            return {
                ...state,
                surveyDetails: action.details
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}