// @TODO Make sure these are the roletypes available and if there aren't any more.

const roleTypes = {
    superAdmin: 'admin',
    admin: 'admin',
    guest: 'guest'
}

export function isSuperAdmin(currentUser) {
    return currentUser && currentUser.userType && currentUser.userType === roleTypes.superAdmin;
}

export function isAdmin(currentUser) {
    return currentUser && currentUser.userType && currentUser.userType === roleTypes.admin;
}

export function isGuest(currentUser) {
    return currentUser && currentUser.userType && currentUser.userType === roleTypes.guest;
}