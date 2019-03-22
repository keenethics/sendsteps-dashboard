
export const sortTypes = {
    NEWEST: 'Newest',
    OLDEST: 'Oldest',
    STARRED: 'Starred',
    GROUPS: 'Groups',
    UPVOTES: 'Upvotes'
}

export function sortMessages(sortBy, messages) {
    switch(sortBy) {
        case sortTypes.NEWEST: return sortByNewest(messages);
        case sortTypes.OLDEST: return sortByOldest(messages);
        case sortTypes.STARRED: return sortByStarred(messages);
        case sortTypes.GROUPS: return sortByGroups(messages);
        case sortTypes.UPVOTES: return sortByUpvotes(messages);
        default: {
            console.warn('Unable to sort by ' + sortBy);
            return messages;
        }
    }
}

export function sortByStarred(messages) {
    return messages.sort((a, b) => {
        return b.starred - a.starred
    })
}

export function sortByNewest(messages) {
    return messages.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })
}

export function sortByOldest(messages) {
    return messages.sort((a, b) => {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    })
}

export function sortByGroups(messages) {
    return messages.sort((a, b) => {
        return a.groupId - b.groupId
    })
}

export function sortByUpvotes(messages) {
    return messages.sort((a, b) => {
        return b.upvotes - a.upvotes
    })
}