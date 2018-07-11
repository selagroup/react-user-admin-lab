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
- on the `App.js` add the `bootstrap` css like so:
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
- on the `User.js` file change the hard coded id, username and email to the one that came from the prop like so
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
- on the `App.js` file add the id, username and email to the `User` element like so.
```jsx
    <User id={1} username={'johndoe'} email={'johndoe@gmail.com'}/>
```
