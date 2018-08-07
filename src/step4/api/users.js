const users = [
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
]
const USER_API = 'http://local.directv.com:3001/users'
const UsersApi = {
    getUserByIdSync(id) {
        return users.find((u) => id === u.id);
    },
    getUsersSync() {
        return [...users]
    },
    async getUsers() {
        const res = await fetch(USER_API);
        const users = await res.json()
        return users
    },
    updateUserSync(user) {
        let userIndex = users.findIndex((u) => u.id === user.id);
        users[userIndex] = user;
        return [...users]
    },
    async updateUser(user) {

        return await await fetch(USER_API + '/' + user.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            // .then((resUser) => new Promise((res) => setTimeout(() => res(resUser), 5000)));
    }
}
export default UsersApi
