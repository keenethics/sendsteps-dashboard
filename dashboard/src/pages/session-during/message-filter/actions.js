
export function addNewGroup(newGroup) {
    return {
        type: 'ADD_NEW_GROUP',
        newGroup
    }
}

export function setMessageFilterData(data) {
    return {
        type: 'SET_DATA',
        data
    }
}

export function updateGroups(newGroups) {
    return {
        type: 'UPDATE_GROUPS',
        newGroups
    }
}

export function selectGroup(selectedGroupId) {
    return {
        type: 'SELECT_GROUP',
        selectedGroupId
    }
}

export function toggleMessageModal(messageModalOpen) {
    return {
        type: 'TOGGLE_MESSAGE_MODAL',
        messageModalOpen
    }
}

export function toggleGroupsModal(groupModalOpen) {
    return {
        type: 'TOGGLE_GROUPS_MODAL',
        groupModalOpen
    }
}

export function expandIncomingPanel(incomingPanelExpanded) {
    return {
        type: 'EXPAND_INCOMING_PANEL',
        incomingPanelExpanded
    }
}

export function sendToScreen(selectedIds) {
    return {
        type: 'SEND_TO_SCREEN',
        selectedIds
    }
}

export function sendToIncoming(selectedIds) {
    return {
        type: 'SEND_TO_INCOMING',
        selectedIds
    }
}

export function sendToQueue(selectedIds) {
    return {
        type: 'SEND_TO_QUEUE',
        selectedIds
    }
}

export function sendToAppeared(selectedIds) {
    return {
        type: 'SEND_TO_APPEARED',
        selectedIds
    }
}

export function clearIncomingSelect() {
    return {
        type: 'CLEAR_INCOMING_SELECT'
    }
}

export function clearOnscreenSelect() {
    return {
        type: 'CLEAR_ONSCREEN_SELECT'
    }
}

export function clearQueueSelect() {
    return {
        type: 'CLEAR_QUEUE_SELECT'
    }
}

export function clearAppearedSelect() {
    return {
        type: 'CLEAR_APPEARED_SELECT'
    }
}

export function toggleSelectIncoming(selectedMessageId) {
    return {
        type: 'SELECT_INCOMING_MESSAGE',
        selectedMessageId
    }
}

export function toggleSelectOnscreen(selectedMessageId) {
    return {
        type: 'SELECT_ONSCREEN_MESSAGE',
        selectedMessageId
    }
}

export function toggleSelectQueue(selectedMessageId) {
    return {
        type: 'SELECT_QUEUE_MESSAGE',
        selectedMessageId
    }
}

export function toggleSelectAppeared(selectedMessageId) {
    return {
        type: 'SELECT_APPEARED_MESSAGE',
        selectedMessageId
    }
}

export function setStarred(messageId) {
    return {
        type: 'SET_STARRED',
        messageId
    }
}

export function addNewMessage(newMessage) {
    return {
        type: 'ADD_MESSAGE',
        newMessage
    }
}

export function deleteSelectedMessages(selectedMessageIds) {
    return {
        type: 'DELETE_MESSAGES',
        selectedMessageIds
    }
}

export function undoRemove() {
    return {
        type: 'UNDO_REMOVE',
    }
}

export function addSelectedToGroup(selectedGroupId) {
    return {
        type: 'ADD_TO_GROUP',
        selectedGroupId
    }
}