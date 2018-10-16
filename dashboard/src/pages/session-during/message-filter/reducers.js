function addOrRemoveFromList(idList, id) {
    let selectedIds = [ ...idList || [] ];
    let alreadyExistsInList = selectedIds.find(messageId => messageId === id)
    !alreadyExistsInList && selectedIds.push(id);
    alreadyExistsInList && selectedIds.splice(selectedIds.indexOf(id), 1);
    return selectedIds;
}

function updateMessageStatus(messages = [], selectedIds = [], newStatus) {

    // @TODO double for? hmmm. worst case: O(messages^2) 
    // Maybe this can be optimized. 

    let clonedMessages = [ ...messages ];

    console.log(clonedMessages, selectedIds);

    for(let x = 0; x < clonedMessages.length; x++) {
        for(let y = 0; y < selectedIds.length; y++) {
            if(selectedIds[y] === clonedMessages[x].id) {
                clonedMessages[x].status = newStatus;
                // y = 0, x++ ? O(n log n)
            }
        }
    }
    return clonedMessages;
}

export default function messageFilterReducer(state, action) {

    switch(action.type) {
        case 'SEND_TO_SCREEN': {
            return {
                ...state,
                messages: updateMessageStatus(
                    state.messages, 
                    action.selectedIds, 
                    'showing'
                ),
            }
        }

        case 'SEND_TO_APPEARED': {
            return {
                ...state,
                messages: updateMessageStatus(
                    state.messages, 
                    action.selectedIds, 
                    'shown'
                ),
            }
        }

        case 'SEND_TO_QUEUE': {
            return {
                ...state,
                messages: updateMessageStatus(
                    state.messages, 
                    action.selectedIds, 
                    'read'
                ),
            }
        }

        case 'SEND_TO_INCOMING': {
            return {
                ...state,
                messages: updateMessageStatus(
                    state.messages, 
                    action.selectedIds, 
                    'unread'
                ),
            }
        }
        case 'CLEAR_INCOMING_SELECT': {
            return {
                ...state,
                selectedIncomingIds: []
            }
        }

        case 'CLEAR_ONSCREEN_SELECT': {
            return {
                ...state,
                selectedOnscreenIds: []
            }
        }

        case 'CLEAR_QUEUE_SELECT': {
            return {
                ...state,
                selectedQueueIds: []
            }
        }

        case 'CLEAR_APPEARED_SELECT': {
            return {
                ...state,
                selectedAppearedIds: []
            }
        }

        case 'SELECT_ONSCREEN_MESSAGE': {
            return {
                ...state,
                selectedOnscreenIds: addOrRemoveFromList(
                    state.selectedOnscreenIds, 
                    action.selectedMessageId
                )
            }
        }

        case 'SELECT_QUEUE_MESSAGE': {
            return {
                ...state,
                selectedQueueIds: addOrRemoveFromList(
                    state.selectedQueueIds, 
                    action.selectedMessageId
                )
            }
        }
        case 'SELECT_APPEARED_MESSAGE': {
            return {
                ...state,
                selectedAppearedIds: addOrRemoveFromList(
                    state.selectedAppearedIds, 
                    action.selectedMessageId
                )
            }
        }
        case 'SELECT_INCOMING_MESSAGE': {
            return {
                ...state,
                selectedIncomingIds: addOrRemoveFromList(
                    state.selectedIncomingIds, 
                    action.selectedMessageId
                )
            }
        }

        case 'SET_STARRED': {

            let messages = [ ...state.messages];
            for(let x = 0; x < messages.length; x++) {
                if(messages[x].id === action.messageId) {
                    messages[x].starred ? messages[x].starred = false : messages[x].starred = true;
                }
            }
            return {
                ...state,
                messages
            }
        }
        case 'ADD_MESSAGE': {
            let messages = [ ...state.messages ];
            messages.push(action.newMessage);
            return {
                ...state,
                messages
            }
        }
        case 'DELETE_MESSAGES': {
            let messages = [ ...state.messages ];
            const selectedIds = action.selectedMessageIds;
            let deletedMessages = [];

            for (let i = 0; i < messages.length; i++) {
                let obj = messages[i];
                if (selectedIds.indexOf(obj.id) !== -1) {
                    deletedMessages.push(messages[i]);
                    messages.splice(i, 1);
                    i--;
                }
            }
            
            console.log(messages);
            console.log(deletedMessages);

            return {
                ...state,
                messages,
                lastDeletedMessages: deletedMessages
            }
        }
        case 'UNDO_REMOVE': {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    ...state.lastDeletedMessages
                ],
                lastDeletedMessages: null
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}