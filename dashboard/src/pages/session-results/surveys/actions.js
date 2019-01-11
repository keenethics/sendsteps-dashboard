export function setSurveyData(data) {
    return {
        type: 'SET_SURVEY_RESULTS_DATA',
        data
    }
}

export function setSurveyDetails(details) {
    return {
        type: 'SET_DETAILS',
        details
    }
}