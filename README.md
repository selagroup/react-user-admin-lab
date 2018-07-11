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
> don't forget to change the `PropTypes` definition as well.
- on `EditUser` component declare `prop` in the `constructor` and pass it to the `super`.
after that assign to `this.state` the prop that you gonna use in the component
```jsx
constructor(prop) {
    super(prop);
    this.state = {
        id: prop.id,
        username: prop.username,
        email: prop.email,
    }
}
```
> **DON'T** assign `this.state = prop`

> Pro Tip: you can use the ES6 spread operator but **ONLY** if you **DON'T** pass to `prop` function
> ```jsx
> constructor(prop) {
>     super(prop);
>     this.state = {
>         ...prop
>     }
> }
> ```

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