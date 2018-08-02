# step 3

- go to `src/api/user.js` file and create `getUsersSync` and `updateUserSync` function.
- on `getUserSync` function return `users` const wrap in spread operator
- on `updateUserSync` function add argument user, [`Array.findIndex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) in `users` the user come in the argument , update the `users[userIndex]` with that user and return spread `users`.

> [spread array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_array_literals) effectively goes one level deep while copying an array. Therefore, it may be unsuitable for copying multidimensional arrays.

```js
/* src/api/users.js */
const UsersApi = {
// ....
    getUsersSync() {
        return [...users]
    },
    updateUserSync(user) {
        let userIndex = users.findIndex((u)=>u.id === user.id);
        users[userIndex] = user;
        return [...users]
    },
// ...
}
```

- go to `App` component `constructor` and remove the `user` variable.
- on the `this.state` set `users` with empty array.

```jsx
/* src/App.js */
...
export default class App extends Component {
    constructor() {
        super();
        this.state = {
           users: []
        }
    }
    ...
}
```

- add `componentDidMount` function in `App` class component. in it call `this.setState` with new object that have `users` as key and `UserApi.getUserSync()` as value.

```jsx
/* src/App.js */
...
export default class App extends Component {
    ...
    componentDidMount() {
        this.setState({
            users: UsersApi.getUsersSync()
        })
    }
    ...
}
```

- add `selectUser` function in `App` class component that get `id` as argument. in that function call to `this.setState` with function that get an `oldState` as argument and return empty object.

```jsx
/* src/App.js */
...
export default class App extends Component {
    ...
    selectUser = (id) => {
        this.setState((oldState) => {
            return {
            }
        })
    }
    ...
}
```

- [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) the user from `oldState.users` and assign it to `const editUser`.
- return the `editUser` as [Property definitions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Property_definitions).

```jsx
/* src/App.js */
...
export default class App extends Component {
    ...
    selectUser = (id) => {
        this.setState((oldState) => {
            const editUser = { ...oldState.users.find((u) => id === u.id) };
            return {
                editUser
            }
        })
    }
    ...
}
```

- on `saveEditUser` instead of calling the spread `oldState.selectedUser` and `oldState.editUser` assign the user with `UsersApi.updateUserSync(oldState.editUser)` call

```diff
/* src/App.js */
saveEditUser = () => {
    this.setState((oldState) => ({
+        users: UsersApi.updateUserSync(oldState.editUser)
-        ...oldState.selectedUser,
-        ...oldState.editUser,
    }))
}
```

```jsx
/* src/App.js */
saveEditUser = () => {
    this.setState((oldState) => ({
        users: UsersApi.updateUserSync(oldState.editUser)
    }))
}
```

- on `editUserChange` function change `selectedUser` spread to `editUser`

```diff
editUserChange = (e) => {
    let editUser = {
        [e.target.name]: e.target.value
    }
    this.setState((oldState) => {
        return {
            editUser: {
-               ...oldState.selectedUser,
+               ...oldState.editUser,
                ...editUser,
            }
        }
    })
}
```

```jsx
editUserChange = (e) => {
    let editUser = {
        [e.target.name]: e.target.value
    }
    this.setState((oldState) => {
        return {
            editUser: {
                ...oldState.editUser,
                ...editUser,
            }
        }
    })
}
```

- go to the `render` function and before `return` add new `let editUser` and assign it to empty string.
- check if there `this.state.editUser`, if so assign `editUser` to `EditUser` element (bind with the properties he need).

```jsx
render() {
    ...
   let editUser = ''
    if (this.state.editUser) {
        editUser = <EditUser {...this.state.editUser}
            save={this.saveEditUser}
            onChange={this.editUserChange} />
    }
    return (
        ...
    )
    ...
}
```

- remove the `EditUser` from the return JSX and replace it with the `editUser` variable as JSX expression.

```diff
<div className="col-xs-12 col-sm-4">
+    {editUser}
-    <EditUser {...this.state.editUser}
-        save={this.saveEditUser}
-        onChange={this.editUserChange} />
</div>
```

```jsx
<div className="col-xs-12 col-sm-4">
    {editUser}
</div>
```

- remove the `User` element and and replace it with JSX expression that map the `this.state.users` to a list of users.

```diff
<div className="col-xs-12 col-sm-8">
+ {this.state.users.map((u) => (
+   <User {...u}/>
+ ))}
- <User {...this.state.selectedUser} />
</div>
```

- wrap the `User` elements with `li` elements and  wrap all of the `li` elements with a single `ul` element.
- on the `li` elements add `key` property with `u.id` value as JSX expression and `onClick` property that get `this.selectedUser.bind(this,u.id)` as JSX expression.

```diff
<div className="col-xs-12 col-sm-8">
+    <ul className="list-group">
+        {this.state.users
+           .map((u) => (
+                <li key={u.id}
+                    onClick={this.selectUser.bind(this, u.id)}
+                    className={"list-group-item"}
+                >
- {this.state.users.map((u) => (
                    <User {...u}/>
+               </li>
        ))}
+    </ul>
</div>
```

- add `map` to `this.state.users` that add active to the user base on `this.state.editUser`.
> remember that you need to return the `user` in the map function.

```diff
<div className="col-xs-12 col-sm-8 list-group">
    <ul className="list-group">
        {this.state.users
+            .map((u) => {
+                u.active = (this.state.editUser ? u.id === this.state.editUser.id ? 'active' : '' : '')
+                return u
+            })
            .map((u) => (
                <li key={u.id}
                    onClick={this.selectUser.bind(this, u.id)}
                    className={"list-group-item"}
                >
                    <User {...u} />
                </li>
            ))}
    </ul>
</div>
```

- add to the `className` on the `li` the `u.active` string.

```diff
<div className="col-xs-12 col-sm-8 list-group">
    <ul className="list-group">
        {this.state.users
            .map((u) => {
                u.active = (this.state.editUser ? u.id === this.state.editUser.id ? 'active' : '' : '')
                return u
            })
            .map((u) => (
                <li key={u.id}
                    onClick={this.selectUser.bind(this, u.id)}
-                    className={"list-group-item"}
+                    className={"list-group-item " + u.active}
                >
                    <User {...u} />
                </li>
            ))}
    </ul>
</div>
```

```jsx
/* src/App.js */
export default class App extends Component {
    ...
    render() {
        ...
        return (
            <div style={style}>
                <h1> User Admin </h1>
                <div className="row">
                    <div className="col-xs-12 col-sm-8 list-group">
                        <ul className="list-group">
                            {this.state.users
                                .map((u) => {
                                    u.active = (this.state.editUser ? u.id === this.state.editUser.id ? 'active' : '' : '')
                                    return u
                                })
                                .map((u) => (
                                    <li key={u.id}
                                        onClick={this.selectUser.bind(this, u.id)}
                                        className={"list-group-item " + u.active}
                                    >
                                        <User {...u} />
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        {editUser}
                    </div>
                </div>
            </div>
        )
    }
    ...
}
```

- go to `./src/users/styles/item.css` and add `background` and `color` properties

```css
/* ./src/users/styles/item.css */
.item{
    width: auto;
    border-radius: 10px;
    border: solid 1px lightgray;
    padding: 10px;
    background: whitesmoke;
    color:black;
 }
```