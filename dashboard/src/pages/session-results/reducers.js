import { addOrRemoveFromList } from '../../scripts/messageHelper';

export default function sessionResultsReducer(state = {}, action) {
    switch(action.type) {
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
        default: {
            return {
                ...state
            }
        }
    }
}