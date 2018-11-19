import { addOrRemoveFromList } from '../../../scripts/messageHelper';

export default function sessionResultsReducer(state = {}, action) {
    switch(action.type) {
        case 'CLEAR_SELECTS': {
            return {
                ...state,
                selectedResultIds: []
            }
        }
        case 'SET_DATA': {
            return {
                ...state,
                presentationResults: action.data
            }
        }
        case 'SET_DETAILS': {
            return {
                ...state,
                presentationDetails: action.details
            }
        }
        case 'SELECT_RESULT': {
            console.log(action.resultId);
            console.log(state.selectedResultIds);
            return {
                ...state,
                selectedResultIds: addOrRemoveFromList(
                    state.selectedResultIds,
                    action.resultId
                )
            }
        }
        case 'FILTER_EMPTY_RESULTS': {
            console.log(state);
            return {
                ...state
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}