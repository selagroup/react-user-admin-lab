
const userApi = {
    list: [
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
    ],
    asPromise: function() {
        return new Promise((res) => {
            setTimeout(() => res(this.list), 1000);
        })
    }
};

module.exports = userApi;