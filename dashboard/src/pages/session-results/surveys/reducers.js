
export default function surveyResultsReducer(state = {}, action) {
    switch(action.type) {
     
        case 'SET_DATA': {
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