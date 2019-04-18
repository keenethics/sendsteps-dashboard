
export default function statisticsReducer(state = {}, action) {
    switch(action.type) {
        case 'SET_STATISTICS_DATA': {
            return {
                ...state,
                statistics: action.data
            }
        }
        case 'SET_REPORT_DETAILS': {
            return {
                ...state,
                reportDetails: action.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}