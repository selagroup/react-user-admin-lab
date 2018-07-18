# React User Admin Lab

## step 0
### create react app

- download node and npm
- install the react boiler plate CLI
    ```sh
    npm i -g create-react-app
    ```
- create your add
    ```sh
    create-react-app <app-name>
    ```
- run the app for the first time.
    ```sh
    cd <app-name>
    yarn start
    ```

## step 0.5
- in order to make the ui more friendly and neat i will use a third party css package call `bootstrap`
- add `bootstrap` to your application by run:
    ```sh
    yarn add bootstrap
    ```
- on the `App.js` add the `bootstrap` css:
    ```jsx
    import 'bootstrap/dist/css/bootstrap.min.css';
    ```
## step 1
### create your first component

- under `src` create new folder, `components`.
- in this folder create  User.js file:
    ```jsx
    /* User.js */
    import React from 'react'
    export default class User extends React.Component {
        render() {
            return (
                <div className="user-item">
                    <div>
                        id:1
                    </div>
                    <div>
                        username:johndoe
                    </div>
                    <div>
                        email:johndoe@gmail.com
                    </div>
                </div>
            );
        }
    }
    ```
- inside `User.js` create a `constructor` function. paste there `console.log('User created!')`
    > don't forget to call to `super()`.
- on the root of the application remove all the css styles and paste this
```css
/* App.css */
.user-item{
   width: 300px;
   border-radius: 10px;
   border: solid 1px lightgray;
   padding: 10px;
}
```
- in `App.js` file
    - add, in the beginning of the file
        ```jsx
        ...
        import User from './src/components/User';
        ...
        ```
    - remove all the `jsx` that return from the `render` function and return 
        ```jsx
        ...
        render() {
            return (
                <User/>
            )
        }
        ...
        ```


## step 2
### pass data from root component to child component.

- declare the properties that `User` component going to use by adding `propTypes`.
    - add at the beginning of `User` file:
        ```jsx
        import PropTypes from 'prop-types';
        ```
    - and on the ending of the file:
        ```jsx
        User.propTypes = {
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired
        }
        ```
    > note: this process isn't necessary but it's best practice.
- on the `User.js` file change the hard coded id, username and email to the one that came from the prop
```jsx
render() {
    return (
        <div className="user-item">
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
- on the `App.js` file add the id, username and email to the `User` element.
```jsx
    <User id={1} username={'johndoe'} email={'johndoe@gmail.com'}/>
```

## step 3
### using the state to trigger render change.
- copy the `User.js` file to `EditUser.js` in the same folder (`src/components`).
- change the class name, in the `EditUser.js` from `User` to `EditUser`.
- on `EditUser` component declare `prop` in the `constructor` and pass it to the `super`.
after that assign to `this.state` the prop that you gonna use in the component
```jsx
constructor(prop) {
    super(prop);
    this.state = {
        id: prop.defaultId,
        username: prop.defaultUsername,
        email: prop.defaultEmail,
    }
}
```
> **DON'T** assign `this.state = prop`
> this will made problem when we try to change the prop form the parent component.
- change the `PropTypes` definition.
```jsx
EditUser.propTypes = {
    defaultId: PropTypes.number,
    defaultUsername: PropTypes.string,
    defaultEmail: PropTypes.string,
}
```

- add `<button>` element to the returning `render` function `jsx`
```jsx
    <button className={'btn btn-primary'}>Save</button>
```
- in that `<button>` element add `onClick` property and assign it to the `this.save`
```jsx
    <button className={'btn btn-primary'} onClick={this.save}>Save</button>
```
- add new function to the `EditUser` class component named it `save`
- on that function call to `this.setState({ userName: 'New User Name'})`
```jsx
...
save() {
    this.setState({
        userName: 'New User Name'
    })
}
...
```
> _warning_: when calling from `jsx` element to class function the scope changing, that why you need to bind the function to the class. i'm using the ES6 `fat arrow function` like so
> ```jsx
> ...
> save = () => {
>     this.setState({
>         userName: 'New User Name'
>     })
> }
> ...
> ```

- change the render `jsx` to point to the `this.state` and not to `this.prop`
```jsx
return (
    <div className="user-item">
        ...
        <div>
            id:{this.state.id}
        </div>
        <div>
            username:{this.state.username}
        </div>
        <div>
            email:{this.state.email}
        </div>
        ...
    </div>
)
```
- add the `EditUser` jsx element to the `App` component
```jsx
<EditUser id={1} username={'johndoe'} email={'johndoe@gmail.com'} />
```
## step 4
### using `<input>` elements in react
- on `EditUser` component change the render `jsx` username and email to input element.
- assign the value of the email element to `value={this.state.email}`.
- assign `update` function to `onChange` property.
- add `name` attribute `name='email'`
- add className '`className=form-control'`.
- do this also to the `username` as well.
```jsx
    render() {
        return (
            <div className="user-item">
                <div>
                    id:{this.state.id}
                </div>
                <div>
                    username: <input value={this.state.username} className='form-control' name='username' onChange={this.update} />
                </div>
                <div>
                    email: <input value={this.state.email} className='form-control' name='email' onChange={this.update} />
                </div>
                <button className={'btn btn-primary'} onClick={this.save}>Save</button>
            </div>
        );
    }
```
- add `update` function to the `EditUser` component class.
```jsx
...
update = (event) => {
    let change = {};
    change[event.target.name] = event.target.value
    this.setState({
        ...change
    });
}
...
```

## step 4.5
### change `User` component to functional component
- copy the `render` return function.
- delete the `User` class.
- create new function name `User` and paste the `render` return function.
- in the class, on the argument of the function, declare `props`.
- remove all of the `this` from from the pasted `render` return.
```jsx
export default function User(props) {
    return (
        <div className="user-item">
            <div>
                id:{props.id}
            </div>
            <div>
                username:{props.username}
            </div>
            <div>
                email:{props.email}
            </div>
        </div>
    );
}
```
> Pro Tip: you can still define the `propTypes` just like you did in the class.

## step 5
### binding between components (child-parent-child)
- on the `EditUser` component create new `propTypes` call `save` of type of `PropTypes.func.isRequired`
- continue in the `EditUser` component change the function `save` to call `this.prop.save` with the id, username and the email that in the state.
```jsx
save = () => {
    this.props.save({
        id: this.state.id,
        username: this.state.username,
        email: this.state.email,
    })
}
```
> *info*: don't use spread operator in this case case there is the `save` function property.
-  in the constructor of the `App` component add a new state, focusUser.
```jsx
...
constructor() {
    super();
    this.state = {
        focusUser: {
        id: 1,
        username: 'johndoe',
        email: 'johndoe@gmail.com',
        }
    }
}
...
```
- create new function on the `App` class call `save`. this function will get a new user and `setState` the `focusUser` with the user using ES6 spread operator.
```jsx
save = (user) => {
    this.setState({
        focusUser: {...user}
    })
}
```
> *info*: it's important to use spread operator to lose ref object with the incoming argument.
- on the `render` function change the `EditUser` and `User` elements to get the id, username and email from `this.state.focusUser`.
```jsx
<EditUser id={this.state.focusUser.id} username={this.state.focusUser.username} email={this.state.focusUser.email} />
<User id={this.state.focusUser.id} username={this.state.focusUser.username} email={this.state.focusUser.email} />
```
- in the `EditUser` element add save property that call `{this.save}`
```jsx
<EditUser ... save={this.save} ... />

```

## step 6
### working with dynamic jsx elements
- go to `App` component and in the constructor clear the `focusUser` value and create `users` state with users.
```jsx
constructor() {
    super();
    this.state = {
        focusUser: void 0,
        users: [
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
    };
}
```
- in the `render` function create new `let` variable call `editTag`.
- check if `this.state.focusUser` exist, if so assign the `editTag` to new `EditUser` with the properties from `this.state.focusUser` if not assign empty string.
```jsx
let focusUser = this.state.focusUser;
let editTag = focusUser ?
    <EditUser key={focusUser.id} save={this.save} defaultId={focusUser.id} defaultUsername={focusUser.username} defaultEmail={focusUser.email} />
    : '';

```
- in the `render` return function replace the `EditUser` element with carly braces and the `editTag` variable.
```jsx
<div>
    <h1>User Admin</h1>
    <div className='container-fluid'>
        {editTag}
    </div>
</div>
```
- continue, using curly braces creating `User` element base on `this.state.users`.
``` jsx
<div>
    <h1>User Admin</h1>
    <div className='container-fluid'>
        {editTag}
        {this.state
        .users
        .map((user, i) =>
            <User
            key={i}
            id={user.id}
            username={user.username}
            email={user.email} />)
        }
    </div>
</div>
```
> note: both practices are fine. you can do what is more readable for you.

## step 6.5
### practice binding between components
- on `App` component add `focus` function with id as parameter, find the user from the `this.state.users` and `setState` the `focusUser` with the user that found in the `users` array
```jsx
focus = (id) => {
    let focusUser = this.state.users.filter((u) => u.id === id)[0]
    this.setState({
        focusUser: { ...focusUser }
    })
}
```
- go to `User` component and add in the `propTypes` `selected` and `onClick` properties.
```jsx
User.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
}
```
- stay on the `User` component and on the return function add to the wrapper div `onClick` with the `props.onClick`.
```jsx
return (
    <div onClick={props.onClick.bind(this, props.id)} className="user-item">
    ...
);
```
> note: this time using the function `bind` function to define the context, also passing `props.id` so when the function will call it will pass the user id in the arguments
- add to the `className` property a condition, when `props.selected` is `true` then add `selected` css class.
```jsx
return (
    <div onClick={props.onClick.bind(this, props.id)}
        className={'user-item ' + (props.selected ? 'selected' : '')}>
    ...
);
```
- go back to `App` component add to the `User` element the `onClick` and `selected` properties
```jsx
return (
    <div>
        <h1>User Admin</h1>
        <div className='container-fluid'>
            {editTag}
            {this.state
            .users
            .map((user, i) =>
                <User
                onClick={this.focus}
                selected={focusUser && focusUser.id === user.id} 
                ...
                />)
            }
        </div>
    </div>
);
```
- on the `save` function find the user, that send to update, from the `this.state.users` and update the user in the array.
```jsx
save = (updateUser) => {
    let users = this.state.users.map((u) => {
        if (u.id === updateUser.id) {
        return {
            ...updateUser
        }
        } else {
        return u;
        }
    })
    this.setState({
        users: users
    })
}
```
- go to `App.css` and add css style for `.user-item.selected`
```css
.user-item.selected {
  background-color: lightblue;
}
```

## step 7
### nested and empty component.
- on `src/components` create new file call `UserList.js`.
- on that file import `React` from `react` and `export`function `UserList`
```jsx
import React from 'react';
export default function UserList(props) {
}
```
- return in this function new empty component `React.Fragment`.
- on the beginning of add `<hr/>` tag
- after that add a `p` tag that print the number of user, do that using `React.Children.count`.
- continue by mapping, using curly braces, the `props.children` so that even user will wrap by div with class `even` and odd with class `odd`.
```jsx
return (
    <React.Fragment>
        <hr/>
        <p>there are {React.Children.count(props.children)} users.</p>
        <div className='list-group'>
            {props.children.map((user, i) =>
                <div key={i} className={(i % 2 === 0 ? 'even' : 'odd')}>
                    {user}
                </div>
            )}
        </div>
    </React.Fragment>
)
```
- on `App` component import the new `UserList` component.
```jsx
import UserList from './components/UserList';
```
- wrap the users mapping with the new `UserList` tag.
```jsx
<UserList>
    {this.state
        .users
        .map((user, i) =>
        <User
            onClick={this.focus}
            selected={focusUser && focusUser.id === user.id} 
            key={i}
            id={user.id}
            username={user.username}
            email={user.email}/>)
    }
</UserList>
```
- on the `App.css` file add the css for odd class
```css
.odd > div {
  background: lightgrey;
}
```

## step 8
### routing using `react-router-dom`

- install `react-router-dom` and save it on the `package.json`
```sh
npm i -S react-router-dom
```
- on the `App` component add `BrowserRouter`, `Route` and `Switch` to the file
> Pro Tip: use `BrowserRouter as Router` to map the `BrowserRouter` to `Router` variable (best practice).
```jsx
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
```
- on the `render` function remove the `editTag`, copy the `<UserList>` tag (with it's nested element).
- under the `<div className='container-fluid'>` add the `<Router>`, `<Switch>`.
- create two `<Route>` element. one for the `<EditUser>` element and one for the `<User>` element.
- on the `<Route>` element add `path` 
```jsx
<div className='container-fluid'>
    <Router>
        <Switch>
            <Route path='/edit/:id'/>
            <Route path='/users'>
            </Route>
        </Switch>
    </Router>
</div>
```
- open and close the users `<Route>` and take the `<UserList>` you copy and paste as nested element.
```jsx
<div className='container-fluid'>
    <Router>
        <Switch>
            <Route path='/edit/:id'/>
            <Route path='/users'>
                <UserList>
                {this.state
                    .users
                    .map((user, i) =>
                    <User
                        onClick={this.focus}
                        selected={focusUser && focusUser.id === user.id} 
                        key={i}
                        id={user.id}
                        username={user.username}
                        email={user.email}/>)
                }
                </UserList>
            </Route>
        </Switch>
    </Router>
</div>
```
- create new function in the `App` component call `bindEditUserById`, pass `props` as argument.
```jsx
bindEditUserById = (props) => {
}
```
- check if `props.match.params.id` is a `Number`. if not return empty string.
- filter, from `this.state.users`, the user with that id. if there isn't return empty string.
```jsx
bindEditUserById = (props) => {
    let id = Number(props.match.params.id;
    if (!Number(id)) return ''

    let focusUser = this.state.users.filter((u) => u.id === id)[0];
    if (!focusUser) return ''
}
```
- return the `<EditUser>` element with the `key`, `save`, `defaultId`, `defaultUsername` and `defaultEmail` properties from the filter user.
```jsx
bindEditUserById = (props) => {
    let id = Number(props.match.params.id;
    if (!Number(id)) return ''

    let focusUser = this.state.users.filter((u) => u.id === id)[0];
    if (!focusUser) return ''

    return <EditUser key={focusUser.id} save={this.save} defaultId={focusUser.id} defaultUsername={focusUser.username} defaultEmail={focusUser.email} />
}
```
- pass the `props` argument as ES6 speared operator in the properties
```jsx
bindEditUserById = (props) => {
    let id = Number(props.match.params.id;
    if (!Number(id)) return ''

    let focusUser = this.state.users.filter((u) => u.id === id)[0];
    if (!focusUser) return ''

    return <EditUser {...props} key={focusUser.id} save={this.save} defaultId={focusUser.id} defaultUsername={focusUser.username} defaultEmail={focusUser.email} />
}
```
- on the `render` return function in the edit `<Route>` add new property call `component` and pass it the `this.bindEditUserById`
```jsx
<div className='container-fluid'>
    <Router>
        <Switch>
            <Route path='/edit/:id' component={this.bindEditUserById} />
            ...
        </Switch>
    </Router>
</div>
```
- import `Link` component from `react-router-dom`.
```jsx
import { ..., Link } from 'react-router-dom';
```
- wrap the `<User>` element inside the `<UserList>` component with `<Link>` and add `to` property to `edit` plus the user id
```jsx
<Link to={'/edit/' + user.id} key={i}>
    <User ... />
</Link>
```
> warning: don't forget to change the `key` property from the `<User>` to the `<Link>` element.
- import `Redirect` component from `react-router-dom`.
```jsx
import { ..., Redirect } from 'react-router-dom';
```
- add `<Redirect>` component to the `<Switch>` element.
- in the `<Redirect>` add two properties, `from='/'` and `to='users'`
```jsx
<Redirect from='/' to='/users' />
```
- create new component in `src/components` folder call `NotFound`
```jsx
import React from 'react';
export default function NotFound(props) {
    return (
        <React.Fragment>
            <h2>404 page not found</h2>
        </React.Fragment>
    );
}
```
- import `Link` component from `react-router-dom`.
```jsx
import { Link } from 'react-router-dom';
```
- add `<Link>` element with `to` property to the `users` page
```jsx
import React from 'react';
import { Link } from 'react-router-dom';
export default function NotFound(props) {
    return (
        <React.Fragment>
            <h2>404 page not found</h2>
            <Link to={'/users'}> Go Back</Link>
        </React.Fragment>
    );
}
```
- back to the `App` component import `NotFound` component.
```jsx
import NotFound from './components/NotFound';
```
- on the `bindEditUserById` function, replace the return empty string with the `<NotFound>` component
```jsx
bindEditUserById = (props) => {
    let id = Number(props.match.params.id);
    if (!Number(id)) return <NotFound />

    let focusUser = this.state.users.filter((u) => u.id === id)[0];
    if (!focusUser) return <NotFound />
    return <EditUser {...props} key={focusUser.id} save={this.save} defaultId={focusUser.id} defaultUsername={focusUser.username} defaultEmail={focusUser.email} />
}
```
- add to the `<Switch>` element in the return of the render function `<Route>` to the `<NotFound>` component
```jsx
<Switch>
    ...
    <Route component={NotFound} />
</Switch>
```
> warning: put that route as the last element (the `<Switch>` component related on the ordering of his children).
- go to the `EditUser` component and add to the `EditUser.propTypes` `history: PropTypes.object,`
```jsx
EditUser.propTypes = {
    ...
    history: PropTypes.object,
    ...
 }
```
- on the `save` function check if there is `this.props.history` and if so use the `push` function to change the route to `/users`.
```jsx
save = () => {
    ...
    if (this.props.history) {
        this.props.history.push('/users');
    }
}
```
> Pro Tip: best practice is change page after the function succeeded.

