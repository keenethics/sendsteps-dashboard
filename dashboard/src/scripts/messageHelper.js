function getMessageByProperty(messages, property, value) {
    let listWithProperty = [];
    messages.forEach(message => {
        message[property] === value && listWithProperty.push(message);
    });
    return listWithProperty;
}

export function addOrRemoveFromList(idList, id) {
    let selectedIds = [ ...idList || [] ];
    let alreadyExistsInList = selectedIds.find(messageId => messageId === id)
    !alreadyExistsInList && selectedIds.push(id);
    alreadyExistsInList && selectedIds.splice(selectedIds.indexOf(id), 1);
    return selectedIds;
}

function updateMessages(messages = [], selectedIds = [], property, newStatus) {
    // @TODO double for? hmmm. worst case: O(messages^2) 
    // Maybe this can be optimized. 

    let clonedMessages = [ ...messages ];

    for(let x = 0; x < clonedMessages.length; x++) {
        for(let y = 0; y < selectedIds.length; y++) {
            if(selectedIds[y] === clonedMessages[x].id) {
                clonedMessages[x][property] = newStatus;
                // y = 0, x++ ? O(n log n)
            }
        }
    }
    return clonedMessages;
}

export function updateMessagesGroup(messages, selectedIds, newGroupId) {
    return updateMessages(messages, selectedIds, 'groupId', parseInt(newGroupId, 10));
}

export function updateMessagesStatus(messages, selectedIds, newStatus) {
    return updateMessages(messages, selectedIds, 'status', newStatus);
}

export function isMessageSelected(messageIds = [], messageIdToFind) {
    return messageIds.find(id => messageIdToFind === id);
}

export function getIncomingMessages(messages) {
    return getMessageByProperty(messages, 'status', 'unread');
}

export function getQueueMessages(messages) {
    return getMessageByProperty(messages, 'status', 'read');
}

export function getOnscreenMessages(messages) {
    return getMessageByProperty(messages, 'status', 'showing');
}

export function getAppearedMessages(messages) {
    return getMessageByProperty(messages, 'status', 'shown');
}