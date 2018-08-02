# step 2

- declare the properties that `User` component going to use by adding `propTypes`.
- add at the beginning of `User` file:

```jsx
/* src/users/components/User.js */
import PropTypes from 'prop-types';
...
User.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
}
```

> note: this process isn't necessary but it's best practice.

- on the `User` component change the hard coded id, username and email to the one that came from the props

```jsx
/* src/users/components/User.js */
render() {
    return (
        <div className="item">
            <div>
                id:{this.props.id}
            </div>
            <div>
                username:{this.props.username}
            </div>
            <div>
                email:{this.props.email}
            </div>
        </div>
    );
}
```

- create new file `EditUser.js` in the `src/users/components` folder
- on that file create functional component by import `React` from `react` module and write `export default function EditUser(props){}` also `import '../styles/item.css'`.

```jsx
/* src/users/components/EditUser.js */
import React from 'react'
import '../styles/item.css'
export default function EditUser(props) {

}
```

- on `EditUser` function `return` a form that contain `username` and `email` input

```jsx
/* src/users/components/EditUser.js */
import React from 'react'
export default function EditUser(props) {
    return (
        <form class="item">
            <legend>Edit User id</legend>
            <div class="form-group">
                <label for="username">username</label>
                <input type="text" name="username" class="form-control" id="username" />
            </div>
            <div class="form-group">
                <label for="email">email</label>
                <input type="text" name="email" class="form-control" id="email" />
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>

    )
}
```

- import `PropTypes` form `prop-types` module
- in the bottom of file assign a `propTypes` object, to the `EditUser` function.
- in that object add `id` key as `PropTypes.string.isRequire`, `username` and `email` keys as `PropTypes.string` and `onChange` and `save` as `PropTypes.func`.

```jsx
/* src/users/components/EditUser.js */
import React from 'react'
export default function EditUser(props) {
...
}

EditUser.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string,
    email: PropTypes.string,
    onChange: PropTypes.func,
    save: PropTypes.func,
}
```

- on each of the `input` element add value property with the match `props` value as jsx expression and `onChange` property with `props.onChange` as jsx expression

```jsx
/* src/users/components/EditUser.js */
<label for="username">username</label>
<input type="text" name="username" class="form-control" id="username"
value={props.username}
onChange={props.onChange}
/>
...
<label for="email">email</label>
<input type="text" name="email" class="form-control" id="email"
value={props.email}
onChange={props.onChange}
/>
```

- in the start of the `EditUser` function add new `let onSubmit` variable and assign to function that get `e` as argument.
- on that function call to `e.preventDefault()` and after that to `props.save`

```jsx
/* src/users/components/EditUser.js */
export default function EditUser(props) {
    const onSubmit = (e) => {
        e.preventDefault();
        props.save();
    }
}
```

- assign the `onSubmit` function to the `form` element `onSubmit` property as jsx expression.

```jsx
/* src/users/components/EditUser.js */
<form onSubmit={onSubmit} class="item">
...
</form>
```

- on the `App` component add create `constructor` function and in that create a `let` user and assign to it user object
> don't forget to call `super()` after the `constructor` function

```jsx
/* src/App.js */
constructor() {
    super();
    let user = {
        id: 1,
        username: 'johndoe',
        email: 'johndoe@gmail.com',
    }
}
```

- after the `let user` assign to `this.state` new object with `selectedUser` and `editUser` as keys and user as value.

```jsx
/* src/App.js */
export default class App extends Component {
    constructor() {
        super();
        let user = {
            id: 1,
            username: 'johndoe',
            email: 'johndoe@gmail.com',
        }
        this.state = {
            selectedUser: user,
            editUser: user
        }
    }
    ...
}
```

- create two new function in the `App` class, `saveEditUser` and `editUserChange`
> make sure those functions are assign as fat arrow function so they will bind to the class context.

```jsx
/* src/App.js */
export default class App extends Component {
    ...
    saveEditUser = () => {
    }
    editUserChange = () => {
    }
    ...
}
```

- on the `saveEditUser` call to `this.setState` with function that get an `oldState` as argument and return empty object.
- on that empty object set `selectedUser` key and on the value assign object with the properties of the `oldState.selectedUser` and `oldState.editUser` spread.
> #### [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_object_literals) allows an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.

```jsx
/* src/App.js */
export default class App extends Component {
    ...
    saveEditUser = () => {
        this.setState((oldState) => {
            return {
                selectedUser: {
                    ...oldState.selectedUser,
                    ...oldState.editUser,
                }
            }
        })
    }
    ...
}
```

> notice that the order of the spread is important cause we want to overwrite what on the `selectedUser` state

- on the `editUserChange` function add `e` as argument
- create `let editUser` variable that assign with object with `[e.target.name]` as key and `e.target.value` as value

> [computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) Starting with ECMAScript 2015, the object initializer syntax also supports computed property names. That allows you to put an expression in brackets [].

- next call `this.setState` with function as argument that get `oldState` as argument and return spread `oldState.selectedUser` and `oldState.editUser` ([Spread syntax](#spread_syntax))

```jsx
/* src/App.js */
export default class App extends Component {
    ...
    editUserChange = (e) => {
        let editUser = {
            [e.target.name]: e.target.value
        }
        this.setState((oldState) => {
            return {
                selectedUser: {
                    ...oldState.editUser,
                    ...editUser,
                }
            }
        })
    }
    ...
}
```

> notice that the order of the spread is important cause we want to overwrite what on the `editUser` state

- import the `EditUser` element from `./users/components/EditUser` and add it to the return `render` function under the `User` element with the `this.state.editUser` spread.

```jsx
/* src/App.js */
...
import EditUser from './users/components/EditUser';
...
export default class App extends Component {
    ...
    render() {
        <div style={style}>
            <h1> User Admin </h1>
            <div class="row">
                <div class="col-xs-12 col-sm-8">
                    <User {...this.state.selectedUser} />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <EditUser {...this.state.editUser}/>
                </div>
            </div>
        </div>
    }
}
```

- on the `EditUser` element add `save` and `onChange` properties and assign the `save` property to `this.saveEditUser` as jsx expression and the `onChange` property to `this.editUserChange` as jsx expression.

```jsx
/* src/App.js */
export default class App extends Component {
    ...
    render() {
        <div style={style}>
            <h1> User Admin </h1>
            <div class="row">
                <div class="col-xs-12 col-sm-8">
                    <User {...this.state.selectedUser} />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <EditUser {...this.state.editUser}
                        save={this.saveEditUser}
                        onChange={this.editUserChange} />
                </div>
            </div>
        </div>
    }
}
```
