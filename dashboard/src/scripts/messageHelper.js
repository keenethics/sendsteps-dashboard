function getMessageByProperty(messages, property, value) {
    let listWithProperty = [];
    messages.forEach(message => {
        message[property] === value && listWithProperty.push(message);
    });
    return listWithProperty;
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