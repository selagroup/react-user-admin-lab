# step 4

## set up server

- got to the `Server` folder in the path of the main project.

- in that file run `npm install`

- after it's finish run `npm start`

> go to `http://localhost:3001/users` and you should see a list of users as a response.

- in `UsersApi` two new method
  - `getUsers`
  - `updateUser`
- in the `getUsers` create a `fetch` request to `http://local.directv.com:3001/users`.
- after that convert the request to `json`
- return the `json` response.

```js
/* src/api/users.js */
const USER_API = 'http://local.directv.com:3001/users'
const UsersApi = {
    async getUsers() {
        const res = await fetch(USER_API);
        const users = await res.json()
        return users
    },
}
```

- in the `updateUser` pass `user` argument, `fetch` to `http://local.directv.com:3001/users/<user.id>`
- pass to the `fetch` request options:
  - `method: 'PUT'`
  - `header: {'Content-Type': 'application/json'}`
  - `body: JSON.stringify(user)`
- call `then` and parse the `response` to `json` and return the request.

```js
/* src/api/users.js */
const USER_API = 'http://local.directv.com:3001/users'
const UsersApi = {
    async updateUser(user) {
        return await await fetch(USER_API + '/' + user.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        }).then((res) => res.json());
    }
}
```

> don't forget to set `async` in the beginning of the `function` and `await` when you call to `promise` (a.k.a. `fetch` and his response).

- in the `App` component convert the `componentDidMount` function to `async` function.
- create new `const users` and assign it to `await UsersApi.getUser()`
- call to `setState` with the `users`as [Property definitions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Property_definitions).

```diff
export default class App extends Component {
-    componentDidMount() {
+    async componentDidMount() {
+        const users = await UsersApi.getUsers();
        this.setState({
-            users: UsersApi.getUsersSync()
+            users
        })
    }
}
```

```jsx
/* src/App.js */
export default class App extends Component {
    ...
    async componentDidMount() {
        const users = await UsersApi.getUsers();
        this.setState({
            users
        })
    }
    ...
}
```

- convert the `saveEditUser` function to `async` function.
- assign new `let editUser` to `await UserApi.UpdateUser(this.state.editUser)`
- pass to the `setState` return object, the `editUser` and on the `users` property `map` the user and change just the `editUser` to the new user.

```diff
-saveEditUser = async () => {
+saveEditUser = async () => {
+    let editUser = await UsersApi.updateUser(this.state.editUser);
    this.setState((oldState) => ({
-            users: UsersApi.updateUserSync(oldState.editUser)
+            editUser,
+            users: oldState.users.map((u) => u.id !== editUser.id ? u : editUser)
    }))
```

```jsx
/* src/App.js */
export default class App extends Component {
    ...
    saveEditUser = async () => {
        let editUser = await UsersApi.updateUser(this.state.editUser);
        this.setState((oldState) => ({
                editUser,
                users: oldState.users.map((u) => u.id !== editUser.id ? u : editUser)
        }))
    }
    ...
}
```
