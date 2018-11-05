export function selectResult(resultId) {
    return {
        type: 'SELECT_RESULT',
        resultId
    }
}

export function filterEmptyResults() {
    return {
        type: 'FILTER_EMPTY_RESULTS',
    }
}

export function clearSelects() {
    return {
        type: 'CLEAR_SELECTS'
    }
}