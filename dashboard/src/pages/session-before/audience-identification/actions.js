export function setSurveyDetails(identificationDetails) {
    return {
        type: 'SET_IDENTIFICATION_DETAILS',
        identificationDetails
    }
}

export function setDeletingIdentificationId(deleteIdentificationQuestionId) {
    return {
        type: 'SET_DELETE_IDENTIFICATION_QUESTION_ID',
        deleteIdentificationQuestionId
    }
}
