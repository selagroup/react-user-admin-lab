# step 6

- install `react-router-dom`
> `npm install react-router-dom`

## new user apis

- go to the `UserApi` object in `src/api/user.js` file and create 3 new function:
    1. `deleteUser` - get `id` as argument and call `USER_API/<id>` with `DELETE` method to delete the user
    2. `createUser` - get `user` as argument and call `USER_API` with `POST` method and the `user` in the `body` to create new user
    3. `getUserById` - get `id` as argument and call `USER_API/<id>` with `GET` method to get a specific user data
        - > note: in the `getUserById` check if the response is `404` and if so return `undefined`.

```js
const UsersApi = {
    ...
    },
    async deleteUser(id) {
        return await fetch(USER_API + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((res) => res.json())
        // .then((resUser) => new Promise((res) => setTimeout(() => res(resUser), 5000)));
    },
    async createUser(user) {

        return await fetch(USER_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
        // .then((resUser) => new Promise((res) => setTimeout(() => res(resUser), 5000)));
    },
    async getUserById(id) {
        return await fetch(USER_API + '/' + id)
            .then(res => res.status === 404 ? void 0 : res.json())

    }
}
```


## create Home page

- create new folder `pages` and in there create new file `Home.js`
- copy the content in `src/App.js` to `src/pages/Home.js`
- in the `Home` page change the class name form `App` to `Home`
- remove all of the `ThemeContext` references in the `Home` page.
> don't forget to change the location of the `import from`

```diff
/* src/pages/Home.js */
import React, { Component } from 'react'
-import User from './users/components/User'
-import Pagination from './users/components/Pagination';
-import EditUser from './users/components/EditUser';
-import UsersApi from './api/users'
-import 'bootstrap/dist/css/bootstrap.min.css'
-import ThemeToggleChange from './features/components/ThemeToggleChange';
-import ThemeContext, { themes } from './contexts/theme.context';
-export default class App extends Component {
+import User from '../users/components/User'
+import Pagination from '../users/components/Pagination';
+import EditUser from '../users/components/EditUser';
+import UsersApi from '../api/users'
+export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            startIndex: 0,
            inPage: 3,
-            theme: themes.light,
-            toggleTheme: this.toggleTheme,
        }
    }
    async componentDidMount() {
        const users = await UsersApi.getUsers();
        this.setState({
            users
        })
    }
    selectUser = (id) => {
        this.setState((oldState) => {
            const editUser = { ...oldState.users.find((u) => id === u.id) };
            return {
                editUser
            }
        })
    }
    saveEditUser = async () => {
        let editUser = await UsersApi.updateUser(this.state.editUser);
        this.setState((oldState) => ({
            editUser,
            users: oldState.users.map((u) => u.id !== editUser.id ? u : editUser)
        }))
    }
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
    nextPage = (e) => {
        this.setState({
            startIndex: e.startIndex,
            editUser: null
        })
    }
-    toggleTheme = () => {
-        this.setState(oldState => ({
-            theme:
-                oldState.theme === themes.dark
-                    ? themes.light
-                    : themes.dark,
-        }));
-    };
    render() {
-        let style = {
-            width: '600px',
-            margin: `10px auto`
-        }
        let editUser = ''
        if (this.state.editUser) {
            editUser = <EditUser {...this.state.editUser}
                save={this.saveEditUser}
                onChange={this.editUserChange} />
        }
-        const themeContextObj = {
-            theme: this.state.theme,
-            toggleTheme: this.state.toggleTheme
-        }
        return (
-            <ThemeContext.Provider value={themeContextObj}>
-                <div style={style}>
-                    <h1> User Admin </h1>
-                    <ThemeToggleChange />
                    <div className="row">
                        <div className="col-xs-12 col-sm-8 list-group">
                            <ul className="list-group">
                                <Pagination inPage={this.state.inPage} startIndex={this.state.startIndex} nextPage={this.nextPage}>
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
                                </Pagination>
                            </ul>
                        </div>
                        <div className={'col-xs-12 col-sm-4'}>
                            {editUser}
                        </div>
                    </div>
-                </div>
-            </ThemeContext.Provider>
        )
    }
}

```

```jsx
/* src/pages/Home.js */
import React, { Component } from 'react'
import User from '../users/components/User'
import Pagination from '../users/components/Pagination';
import EditUser from '../users/components/EditUser';
import UsersApi from '../api/users'
export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            startIndex: 0,
            inPage: 3,
        }
    }
    async componentDidMount() {
        const users = await UsersApi.getUsers();
        this.setState({
            users
        })
    }
    selectUser = (id) => {
        this.setState((oldState) => {
            const editUser = { ...oldState.users.find((u) => id === u.id) };
            return {
                editUser
            }
        })
    }
    saveEditUser = async () => {
        let editUser = await UsersApi.updateUser(this.state.editUser);
        this.setState((oldState) => ({
            editUser,
            users: oldState.users.map((u) => u.id !== editUser.id ? u : editUser)
        }))
    }
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
    nextPage = (e) => {
        this.setState({
            startIndex: e.startIndex,
            editUser: null
        })
    }
    render() {
        let editUser = ''
        if (this.state.editUser) {
            editUser = <EditUser {...this.state.editUser}
                save={this.saveEditUser}
                onChange={this.editUserChange} />
        }
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-8 list-group">
                    <ul className="list-group">
                        <Pagination inPage={this.state.inPage} startIndex={this.state.startIndex} nextPage={this.nextPage}>
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
                        </Pagination>
                    </ul>
                </div>
                <div className={'col-xs-12 col-sm-4'}>
                    {editUser}
                </div>
            </div>
        )
    }
}

```

- in the `App` component remove all of the users references.
- import `Home` page and on the `render` function declare `<Home>` component.

```diff
/* src/App.js */
import React, { Component } from 'react'
-import User from './users/components/User'
-import Pagination from './users/components/Pagination';
-import EditUser from './users/components/EditUser';
-import UsersApi from './api/users'
+import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import ThemeToggleChange from './features/components/ThemeToggleChange';
import ThemeContext, { themes } from './contexts/theme.context';
export default class App extends Component {
    constructor() {
        super();
        this.state = {
-            users: [],
-            startIndex: 0,
-            inPage: 3,
            theme: themes.light,
            toggleTheme: this.toggleTheme,
        }
    }
        const users = await UsersApi.getUsers();
-    async componentDidMount() {
-        this.setState({
-            users
-        })
-    }
-    selectUser = (id) => {
-        this.setState((oldState) => {
-            const editUser = { ...oldState.users.find((u) => id === u.id) };
-            return {
-                editUser
-            }
-        })
-    }
-    saveEditUser = async () => {
-        let editUser = await UsersApi.updateUser(this.state.editUser);
-        this.setState((oldState) => ({
-            editUser,
-            users: oldState.users.map((u) => u.id !== editUser.id ? u : editUser)
-        }))
-    }
-    editUserChange = (e) => {
-        let editUser = {
-            [e.target.name]: e.target.value
-        }
-        this.setState((oldState) => {
-            return {
-                editUser: {
-                    ...oldState.editUser,
-                    ...editUser,
-                }
-            }
-        })
-    }
-    nextPage = (e) => {
-        this.setState({
-            startIndex: e.startIndex,
-            editUser: null
-        })
-    }
    toggleTheme = () => {
        this.setState(oldState => ({
            theme:
                oldState.theme === themes.dark
                    ? themes.light
                    : themes.dark,
        }));
    };
    render() {
        let style = {
            width: '600px',
            margin: `10px auto`
        }
-        let editUser = ''
-        if (this.state.editUser) {
-            editUser = <EditUser {...this.state.editUser}
-                save={this.saveEditUser}
-                onChange={this.editUserChange} />
-        }
        const themeContextObj = {
            theme: this.state.theme,
            toggleTheme: this.state.toggleTheme
        }
        return (
            <ThemeContext.Provider value={themeContextObj}>
                <div style={style}>
                    <h1> User Admin </h1>
                    <ThemeToggleChange />
-                    <div className="row">
-                        <div className="col-xs-12 col-sm-8 list-group">
-                            <ul className="list-group">
-                                <Pagination inPage={this.state.inPage} startIndex={this.state.startIndex} nextPage={this.nextPage}>
-                                    {this.state.users
-                                        .map((u) => {
-                                            u.active = (this.state.editUser ? u.id === this.state.editUser.id ? 'active' : '' : '')
-                                            return u
-                                        })
-                                        .map((u) => (
-                                            <li key={u.id}
-                                                onClick={this.selectUser.bind(this, u.id)}
-                                                className={"list-group-item " + u.active}
-                                            >
-                                                <User {...u} />
-                                            </li>
-                                        ))}
-                                </Pagination>
-                            </ul>
-                        </div>
-                        <div className={'col-xs-12 col-sm-4'}>
-                            {editUser}
-                        </div>
-                    </div>
+                <Home/>
                </div>
            </ThemeContext.Provider>
        )
    }
}

```

```jsx
/* src/App.js */
import React, { Component } from 'react'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import ThemeToggleChange from './features/components/ThemeToggleChange';
import ThemeContext, { themes } from './contexts/theme.context';
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            theme: themes.light,
            toggleTheme: this.toggleTheme,
        }
    }
    toggleTheme = () => {
        this.setState(oldState => ({
            theme:
                oldState.theme === themes.dark
                    ? themes.light
                    : themes.dark,
        }));
    };
    render() {
        let style = {
            width: '600px',
            margin: `10px auto`
        }
        const themeContextObj = {
            theme: this.state.theme,
            toggleTheme: this.state.toggleTheme
        }
        return (
            <ThemeContext.Provider value={themeContextObj}>
                <div style={style}>
                    <h1> User Admin </h1>
                    <ThemeToggleChange />
                    <Home/>
                 </div>
            </ThemeContext.Provider>
        )
    }
}
```

## create UserDetails page

- create new file `UserDetails.js` on `src/pages` folder
- in that file create new class component name `UserDetails`.