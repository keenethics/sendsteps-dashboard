import { updateMessagesStatus, updateMessagesGroup, addOrRemoveFromList} from '../../../scripts/messageHelper';

export default function messageFilterReducer(state = {}, action) {
    switch(action.type) {
        case 'ADD_NEW_GROUP': {
            console.log(action.newGroup);
            let updatedGroups = { ...state.messageGroups };
            updatedGroups[action.newGroup.id] = {
                name: action.newGroup.name,
                color: action.newGroup.color
            }
            return {
                ...state,
                messageGroups: updatedGroups
            }
        }
        case 'SET_DATA': {
            return {
                ...state,
                messages: action.data
            }
        }

        case 'SET_GROUP_DATA': {
            return {
                ...state,
                messageGroups: action.data
            }
        }
        case 'UPDATE_GROUPS': {
            return {
                ...state,
                messageGroups: action.newGroups
            }
        }
        case 'SELECT_GROUP': {
            return {
                ...state,
                selectedGroupId: action.selectedGroupId
            }
        }
        case 'REMOVE_GROUP': {
            let updatedGroups = {...state.messageGroups};
            delete updatedGroups[action.groupId];
            return {
                ...state,
                messageGroups: updatedGroups
            }
        }
        case 'TOGGLE_MESSAGE_MODAL': {
            return {
                ...state,
                messageModalOpen: action.messageModalOpen
            }
        }
        case 'TOGGLE_EDIT_MESSAGE_MODAL': {
            return {
                ...state,
                editMessageModalOpen: action.editMessageModalOpen
            }
        }
        case 'TOGGLE_GROUPS_MODAL': {
            return {
                ...state,
                groupModalOpen: action.groupModalOpen
            }
        }
        case 'EXPAND_INCOMING_PANEL': {
            return {
                ...state,
                incomingPanelExpanded: action.incomingPanelExpanded
            }
        }
        case 'SEND_TO_SCREEN': {
            return {
                ...state,
                messages: updateMessagesStatus(
                    state.messages, 
                    action.selectedIds,
                    'showing'
                ),
            }
        }

        case 'SEND_TO_APPEARED': {
            return {
                ...state,
                messages: updateMessagesStatus(
                    state.messages, 
                    action.selectedIds, 
                    'shown'
                ),
            }
        }

        case 'SEND_TO_QUEUE': {
            return {
                ...state,
                messages: updateMessagesStatus(
                    state.messages, 
                    action.selectedIds, 
                    'read'
                ),
            }
        }

        case 'SEND_TO_INCOMING': {
            return {
                ...state,
                messages: updateMessagesStatus(
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
                    // Invert 0 / 1 
                    messages[x].starred = messages[x].starred ^ 1;
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

            console.log(messages);
            return {
                ...state,
                messages,
                messageModalOpen: false,
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
        case 'ADD_TO_GROUP': {
            return {
                ...state,
                messages: updateMessagesGroup(
                    state.messages, 
                    state.selectedIncomingIds, 
                    action.selectedGroupId
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