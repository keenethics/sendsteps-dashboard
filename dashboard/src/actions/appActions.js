export function toggleMenu(isOpened) {
    console.log(isOpened);
    return {
        type: 'TOGGLE_MENU',
        isOpened
    }
}