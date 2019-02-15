// @TODO Make sure these are the roletypes available and if there aren't any more.

const roleTypes = {
    superAdmin: 'superadmin',
    admin: 'admin',
    user: 'user'
}

export function isSuperAdmin(currentUser) {
    return currentUser && currentUser.userType && currentUser.userType === roleTypes.superAdmin;
}

export function isAdmin(currentUser) {
    return currentUser && currentUser.userType && currentUser.userType === roleTypes.admin;
}

export function isGuest(currentUser) {
    return currentUser && currentUser.userType && currentUser.userType === roleTypes.user;
}