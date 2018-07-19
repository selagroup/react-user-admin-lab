export const UserActions = {
    ADD_USER: 'ADD_USER',
    REMOVE_USER: 'REMOVE_USER',
    UPDATE_USER: 'UPDATE_USER',
}
export function addUser(user) {
    return ({
        type: UserActions.ADD_USER,
        user
    })
}
export function removeUser(id) {
    return ({
        type: UserActions.REMOVE_USER,
        id
    })
}
export function updateUser(user) {
    return ({
        type: UserActions.UPDATE_USER,
        user
    })
}