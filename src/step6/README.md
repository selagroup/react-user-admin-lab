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

## delete user

- go to `EditUser` component.
- change the `PropTypes` `id` to **not** be required and add new property `delete` of type `PropTypes.func`

```diff
/* src/users/components/EditUser.js */
...
class EditUser extends React.Component {
    ...
}

export default ApplyTheme(Logger(EditUser,'edit user'));


EditUser.propTypes = {
-   id: PropTypes.number.isRequired
+   id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    onChange: PropTypes.func,
    save: PropTypes.func,
+   delete: PropTypes.func,
}
```

```jsx
/* src/users/components/EditUser.js */
...
class EditUser extends React.Component {
    ...
}

export default ApplyTheme(Logger(EditUser,'edit user'));


EditUser.propTypes = {
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    onChange: PropTypes.func,
    save: PropTypes.func,
    delete: PropTypes.func,
}
```

- on the `<legend>` element check if there is `this.props.id`. if so display the old text, if not then display new text `create new user`.

```diff
/* src/users/components/EditUser.js */
...
class EditUser extends React.Component {
        render() {
        return (
            <form onSubmit={this.onSubmit} className="item">
-                <legend>Edit User id:{this.props.id}</legend>
+                <legend>
+                    {this.props.id ? (
+                        <React.Fragment>Edit User id:{this.props.id}</React.Fragment>
+                    ) : (
+                            <React.Fragment>crete new user</React.Fragment>
+                        )}
+                </legend>
                ...
            </form>
            )
        }
}

```

```jsx
/* src/users/components/EditUser.js */
...
class EditUser extends React.Component {
        render() {
        return (
            <form onSubmit={this.onSubmit} className="item">
                <legend>
                    {this.props.id ? (
                        <React.Fragment>Edit User id:{this.props.id}</React.Fragment>
                    ) : (
                            <React.Fragment>crete new user</React.Fragment>
                        )}
                </legend>
                ...
            </form>
            )
        }
}

```

- on the bottom of the `<form>` do the some check like in te previous bullet but here, if there is `this.props.user.id` add to the `Save` button `Delete` button that call `onClick` to `this.props.delete`
- display `Create` button if there isn't `this.props.id`.

```diff
/* src/users/components/EditUser.js */
...
class EditUser extends React.Component {
        render() {
        return (
            <form onSubmit={this.onSubmit} className="item">
                ...
+                {this.props.id ? (
+                    <React.Fragment>
                        <button type="submit" className="btn btn-primary">Save</button>
+                        <button type="button" onClick={this.props.delete} className="btn btn-danger">Delete</button>
+                    </React.Fragment>
+                ) : (
+                        <button type="submit" className="btn btn-primary">Create</button>
+                    )}
            </form>
            )
        }
}

```

```jsx
/* src/users/components/EditUser.js */
...
class EditUser extends React.Component {
        render() {
        return (
            <form onSubmit={this.onSubmit} className="item">
                ...
                {this.props.id ? (
                    <React.Fragment>
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" onClick={this.props.delete} className="btn btn-danger">Delete</button>
                    </React.Fragment>
                ) : (
                        <button type="submit" className="btn btn-primary">Create</button>
                    )}
            </form>
            )
        }
}

```

## create UserDetail page

- create new file `UserDetail.js` in `src/pages`
- import `React`, `EditUser`, `UserApi` and `{ withRoute }`.

```jsx
/* src/pages/UserDetails.js */
import React, { Component } from 'react'
import EditUser from '../users/components/EditUser';
import UsersApi from '../api/users';
import { withRouter } from 'react-router-dom';
```

- create new class component `UserDetails`

```jsx
/* src/pages/UserDetails.js */
class UserDetails extends Component {
}
```

- in the class `constructor` assign `this.state` with new property `userRequested:false`

```jsx
/* src/pages/UserDetails.js */
class UserDetails extends Component {
    constructor() {
        super()
        this.state = {
            userRequested: false
        }
    }
}
```

- create `async componentDidMount` function and on it check if `this.props.match.params.id`, if so call to `this.setState` with `user` property that `await` to `UsersApi.getUserById` with `this.props.match.params.id` as argument.

```jsx
/* src/pages/UserDetails.js */
class UserDetails extends Component {
    async componentDidMount() {
        if (this.props.match.params.id){
            this.setState({
                user: await UsersApi.getUserById(this.props.match.params.id)
            })
        }
    }
}
```

- create `updateUser`, `deleteUser` and `createUser` functions that `async await` to `UsersApi.updateUser`, `UsersApi.deleteUser` and `UserApi.createUser`. when the response arrived call `this.props.history.push('/')`

```jsx
/* src/pages/UserDetails.js */
class UserDetails extends Component {
    ...
    updateUser = async () => {
        await UsersApi.updateUser(this.state.user);
        this.props.history.push('/')

    }
    deleteUser = async () => {
        await UsersApi.deleteUser(this.state.user.id);
        this.props.history.push('/')
    }
    createUser = async () => {
        await UsersApi.createUser(this.state.user);
        this.props.history.push('/')

    }
    ...
}
```

- create `userChange` function that get `e` as argument and just like `editUserChange` in `App` component `setState` to the `user` (instead of the `editUser` in `App` component)

```jsx
/* src/pages/UserDetails.js */
class UserDetails extends Component {
    ...
    userChange = (e) => {
        let user = {
            [e.target.name]: e.target.value
        }
        this.setState((oldState) => {
            return {
                user: {
                    ...oldState.user,
                    ...user,
                }
            }
        })
    }
    ...
}
```

- on the `render` function check:
  - if `!this.props.match.params.id === true` return `<EditUser>` component with:
    - `save` with `this.createUser`
    - `onChange` with `this.userChange`
  - if is `this.state.user` return `<EditUser>` component with:
    - the spread `this.state.user`
    - `save` with `this.updateUser`
    - `delete` with `this.deleteUser`
    - `onChange` with `this.userChange`
  - if `this.state.userRequested` return text that the `id` didn't found.
  - else return text the the user is fetching data from the server.

```jsx
/* src/pages/UserDetails.js */
class UserDetails extends Component {
    ...
    render() {
        if (!this.props.match.params.id) {
            return (
                <EditUser
                    save={this.createUser}
                    onChange={this.userChange} />
            )
        }
        else if (this.state.user) {
            return (
                <EditUser {...this.state.user}
                    save={this.updateUser}
                    delete={this.deleteUser}
                    onChange={this.userChange} />)
        } else if (this.state.userRequested) {
            return <h2> User id: {this.props.match.params.id} not found</h2>
        }
        else {
            return <h2> getting user data</h2>
        }
    }
}
```

- `export default` the `UserDetails` wrap with `withRouter` HOC.

```jsx
/* src/pages/UserDetails.js */
class UserDetails extends Component {
...
}
export default withRouter(UserDetails);
```

- the complete `UserDetail` component

```jsx
/* src/pages/UserDetails.js */
import React, { Component } from 'react'
import EditUser from '../users/components/EditUser';
import UsersApi from '../api/users';
import { withRouter } from 'react-router-dom';

class UserDetails extends Component {
    constructor() {
        super()
        this.state = {
            userRequested: false
        }
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            this.setState({
                user: await UsersApi.getUserById(this.props.match.params.id)
            })
        }
    }
    updateUser = async () => {
        await UsersApi.updateUser(this.state.user);
        this.props.history.push('/')

    }
    deleteUser = async () => {
        await UsersApi.deleteUser(this.state.user.id);
        this.props.history.push('/')
    }
    createUser = async () => {
        await UsersApi.createUser(this.state.user);
        this.props.history.push('/')

    }
    userChange = (e) => {
        let user = {
            [e.target.name]: e.target.value
        }
        this.setState((oldState) => {
            return {
                user: {
                    ...oldState.user,
                    ...user,
                }
            }
        })
    }
    render() {
        if (!this.props.match.params.id) {
            return (
                <EditUser
                    save={this.createUser}
                    onChange={this.userChange} />
            )
        }
        else if (this.state.user) {
            return (
                <EditUser {...this.state.user}
                    save={this.updateUser}
                    delete={this.deleteUser}
                    onChange={this.userChange} />)
        } else if (this.state.userRequested) {
            return <h2> User id: {this.props.match.params.id} not found</h2>
        }
        else {
            return <h2> getting user data</h2>
        }
    }
}

export default withRouter(UserDetails);

```

## create Home page

- on `pages` folder create new file `Home.js`
- copy the content in `src/App.js` to `src/pages/Home.js`
- in the `Home` page change the class name form `App` to `Home`
- remove all of the `ThemeContext` and `EditUser` references in the `Home` page.
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
-        let editUser = ''
-        if (this.state.editUser) {
-            editUser = <EditUser {...this.state.editUser}
-                save={this.saveEditUser}
-                onChange={this.editUserChange} />
-        }
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
-                        <div className="col-xs-12 col-sm-8 list-group">
+                        <div className="col-sm-12 list-group">
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
-                        <div className={'col-xs-12 col-sm-4'}>
-                            {editUser}
-                        </div>
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
    nextPage = (e) => {
        this.setState({
            startIndex: e.startIndex,
            editUser: null
        })
    }
    render() {
        return (

            <div className="col-sm-12 list-group">
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
        )
    }
}


```

- import `Link` from react-router-dom

```diff
/* src/pages/Home.js */
...
import UsersApi from '../api/users'
+import { Link } from 'react-router-dom';
export default class Home extends Component {
    ...
}
```

```jsx
/* src/pages/Home.js */
...
import UsersApi from '../api/users'
import { Link } from 'react-router-dom';
export default class Home extends Component {
    ...
}
```

- in the `li` element remove the `onClick` and wrap the `<User>` element with `Link`

```diff
/* src/pages/Home.js */
export default class Home extends Component {
    ...
    render(){
        return (
            <div className="col-sm-12 list-group">
                <ul className="list-group">
                ...
                    <li key={u.id}
-                        onClick={this.selectUser.bind(this, u.id)}
                        className={"list-group-item " + u.active}
                    >
+                        <Link to={"/user/" + u.id}>
                            <User {...u} />
+                        </Link>
                    </li>
                ...
                </ul>
           </div>
        )
    }
```

```jsx
/* src/pages/Home.js */
export default class Home extends Component {
    ...
    render(){
        return (
            <div className="col-sm-12 list-group">
                <ul className="list-group">
                ...
                    <li key={u.id}
                        className={"list-group-item " + u.active}
                    >
                        <Link to={"/user/" + u.id}>
                            <User {...u} />
                        </Link>
                    </li>
                ...
                </ul>
           </div>
        )
    }
```

## create the router SWITCH

- in the `App` component remove all of the users references.


```diff
/* src/App.js */
import React, { Component } from 'react'
-import User from './users/components/User'
-import Pagination from './users/components/Pagination';
-import EditUser from './users/components/EditUser';
-import UsersApi from './api/users'
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
                 </div>
            </ThemeContext.Provider>
        )
    }
}
```

- import `Home` and `UserDetails` pages and `BrowserRouter`, `Route`, `NavLink` and  `Switch` from 'react-router-dom'

```jsx
/* src/App.js */
import React, { Component } from 'react'
import Home from './pages/Home'
import UserDetails from './pages/UserDetails'
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
```

- on the render function, wrap the main div with `<BrowserRouter>`

```diff
/* src/App.js */
...
export default class App extends Component {
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
+                <BrowserRouter>
                    <div style={style}>
                    <h1> User Admin </h1>
                    ...
                    </div>
+                </BrowserRouter>
            </ThemeContext.Provider>
        )
    }
}
```

```jsx
/* src/App.js */
...
export default class App extends Component {
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
                <BrowserRouter>
                    <div style={style}>
                    ...
                    </div>
                </BrowserRouter>
            </ThemeContext.Provider>
        )
    }
}
```

- create `<Switch>` element inside the main `<div>`
- in that `<Switch>` element create `<Route>` elements that route to:
  - `exact path="/" component={Home}`
  - `exact path="/user/create" component={UserDetails}`
  - `path="/user/:id" component={UserDetails}`
  - `render={() => <h2> Page not found!</h2>}`

```jsx
/* src/App.js */
...
export default class App extends Component {
    render() {
        return (
            <ThemeContext.Provider value={themeContextObj}>
                <BrowserRouter>
                    <div style={style}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/user/create" component={UserDetails} />
                            <Route path="/user/:id" component={UserDetails} />
                            <Route render={() => <h2> Page not found!</h2>} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </ThemeContext.Provider>
        )
    }
}
```

- create `<nav>` element that `<NavLink>` to `Home` and `Create` pages

```jsx
export default class App extends Component {
    render() {
        return (
            <ThemeContext.Provider value={themeContextObj}>
                <BrowserRouter>
                    <nav className="navbar navbar-expand-sm bg-light">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <span className="nav-link"><NavLink to="/" exact >Home</NavLink></span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link"><NavLink to="/user/create" exact >Create</NavLink></span>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                <ThemeToggleChange />
                            </ul>
                    </nav>
                    <div style={style}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/user/create" component={UserDetails} />
                            <Route path="/user/:id" component={UserDetails} />
                            <Route render={() => <h2> Page not found!</h2>} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </ThemeContext.Provider>
        )
    }
}
```
