export function setSurveyData(data) {
    return {
        type: 'SET_DATA',
        data
    }
}

export function setSurveyDetails(data) {
    return {
        type: 'SET_SURVEY_DETAILS',
        data
    }
}

export function setDeleteSurveyId(deleteSurveyId) {
    return {
        type: 'SET_DELETE_SURVEY_ID',
        deleteSurveyId
    }
}