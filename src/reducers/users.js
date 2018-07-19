import { UserActions } from '../actions';

export default function users(state = [
    {
        id: 1,
        username: 'johndoe',
        email: 'johndoe@gmail.com',
    },
    {
        id: 2,
        username: 'janedoe',
        email: 'janedoe@gmail.com',
    },
    {
        id: 3,
        username: 'johnsmith',
        email: 'johnsmith@gmail.com',
    },
    {
        id: 4,
        username: 'janesmith',
        email: 'janesmith@gmail.com',
    }
], action) {
    switch (action.type) {
        case UserActions.ADD_USER:
            return [
                ...state,
                action.user
            ]
        case UserActions.REMOVE_USER:
            return [
                ...state
                    .filter((u) => u.id !== action.id)
            ]
        case UserActions.UPDATE_USER:
            return [
                ...state
                    .map((u) =>
                        u.id !== action.user.id ?
                            u :
                            { ...action.user, u })
            ]
        default:
            return state;
    }

}

