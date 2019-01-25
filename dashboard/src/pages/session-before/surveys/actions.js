export function setSurveyData(data) {
    return {
        type: 'SET_SURVEY_DATA',
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

export function setDeletingSurveyQuestionId(deleteSurveyQuestionId) {
    return {
        type: 'SET_DELETE_SURVEY_QUESTION_ID',
        deleteSurveyQuestionId
    }
}

export function setCurrentSurveyToPlay(surveyId) {
    return {
        type: 'SET_SURVEY_TO_PLAY',
        surveyId
    }
}