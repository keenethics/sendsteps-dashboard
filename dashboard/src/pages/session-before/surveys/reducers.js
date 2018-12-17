
export default function surveyReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_DATA': {
            const surveys = {
                ...action.data
            }
            return {
                ...state,
                surveys
            }
        }
        case 'SET_SURVEY_DETAILS': {
            return {
                ...state,
                surveyDetails: action.data
            }
        }
        case 'SET_DELETE_SURVEY_ID': {
            return {
                ...state,
                deleteSurveyId: action.deleteSurveyId
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}