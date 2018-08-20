# step 5

## React.Fragment + props.children

- create new file `Pagination.js` in `src/users/components/`.
- in that file create new `function component`.
- assign to the `Pagination` function `propsTypes` with `startIndex`, `inPage` of type number that require and `nextPage` of type function that require also.

```jsx
/* src/users/components/Pagination.js */
import React from 'react'
import PropTypes from 'prop-types';
export default function Pagination(props) {
    return (
        <div></div>
    )
}
Pagination.propTypes = {
    startIndex: PropTypes.number.isRequired,
    inPage: PropTypes.number.isRequired,
    nextPage: PropTypes.func.isRequired,
}
```

- create two new function, `onNext` and `onPrev`
- those function should call to `props.nextPage` with new `startIndex` base on going next page or previous page.

```jsx
/* src/users/components/Pagination.js */
...
export default function Pagination(props) {
    const onPrev = () => {
        let startIndex = props.startIndex - props.inPage;
        if (startIndex >= 0) {
            props.nextPage({ startIndex });
        }
    }
    const onNext = () => {
        let startIndex = props.startIndex + props.inPage;
        if (startIndex < props.children.length) {
            props.nextPage({ startIndex });
        }
    }
    ...
}
...
```

- return a `React.Fragment` component that contain two buttons, prev and next.
- under that buttons using `jsx expression`, wrap the `props.children` with `Array` function and `slice` it from the `props.startIndex` to `props.startIndex + props.inPage`

```jsx
/* src/users/components/Pagination.js */
...
export default function Pagination(props) {
    ...
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-6">
                    <button onClick={onPrev} type="button" className="list-group-item list-group-item-action">Prev</button>
                </div>
                <div className="col-sm-6">
                    <button onClick={onNext} type="button" className="list-group-item list-group-item-action">Next</button>
                </div>
            </div>
            {Array(...props.children).slice(props.startIndex, props.startIndex + props.inPage)}
        </React.Fragment>
    )
}
...
```

- the final file should be

```jsx
/* src/users/components/Pagination.js */
import React from 'react'
import PropTypes from 'prop-types';

export default function Pagination(props) {
    const onPrev = () => {
        let startIndex = props.startIndex - props.inPage;
        if (startIndex >= 0) {
            props.nextPage({ startIndex });
        }
    }
    const onNext = () => {
        let startIndex = props.startIndex + props.inPage;
        if (startIndex < props.children.length) {
            props.nextPage({ startIndex });
        }
    }
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-6">
                    <button onClick={onPrev} type="button" className="list-group-item list-group-item-action">Prev</button>
                </div>
                <div className="col-sm-6">
                    <button onClick={onNext} type="button" className="list-group-item list-group-item-action">Next</button>
                </div>
            </div>
            {Array(...props.children).slice(props.startIndex, props.startIndex + props.inPage)}
        </React.Fragment>
    )
}
Pagination.propTypes = {
    startIndex: PropTypes.number.isRequired,
    inPage: PropTypes.number.isRequired,
    nextPage: PropTypes.func.isRequired,
}
```

- in `App` component import `Pagination`

```jsx
/* src/App.js */
...
import Pagination from './users/components/Pagination';
...
```

- go to the `constructor` function and add to `this.state`, `startIndex :0` and `inPage: 3`.

```diff
/* src/App.js */
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
+            startIndex: 0,
+            inPage: 3,
        }
    }
    ...
}
```

- add `nextPage` function that get an argument and update the `state` `startIndex` and `null` the `editUser`

```jsx
/* src/App.js */
export default class App extends Component {
    ...
    nextPage = (e) => {
        this.setState({
            startIndex: e.startIndex,
            editUser: null
        })
    }
    ...
}
```

- wrap the users display JSX expression with `<Pagination>` element

```diff
/* src/App.js */
export default class App extends Component {
    ...
    render() {
        ...
        <ul>
+            <Pagination 
+                inPage={this.state.inPage} 
+                startIndex={this.state.startIndex} 
+                nextPage={this.nextPage}>
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
+            </Pagination>
        </ul>
        ...
    }
}
```

- complete render return function

```jsx
/* src/App.js */
<div style={style}>
    <h1> User Admin </h1>
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
</div>
```

## Ref

- convert `EditUser` component from `function component` to `class component`.

```diff
/* src/users/components/EditUser.js */
import React from 'react'
import PropTypes from 'prop-types'
import '../styles/item.css';
+class EditUser extends React.Component {
+    constructor(props) {
+        super(props);
+    }
+    onSubmit = (e) => {
+        e.preventDefault();
+        this.props.save();
+    }
+    render() {
-export default function EditUser(props) {
-    const onSubmit = (e) => {
-        e.preventDefault();
-        props.save();
-    }
        return (
+            <form onSubmit={this.onSubmit} className="item">
+                <legend>Edit User id:{this.props.id}</legend>
-            <form onSubmit={onSubmit} className="item">
-                <legend>Edit User id:{this.props.id}</legend>
                <div className="form-group">
                    <label htmlFor="username">username</label>
+                    <input type="text" name="username" className="form-control" id="username"
+                        value={this.props.username}
+                        onChange={this.props.onChange}
-                    <input ref={nameInput} type="text" name="username" className="form-control" id="username"
-                        value={props.username}
-                        onChange={props.onChange}
                    />

                </div>
                <div className="form-group">
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" className="form-control" id="email"
+                        value={this.props.email}
+                        onChange={this.props.onChange}
-                        value={props.email}
-                        onChange={props.onChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>

        )
    }
}
+export default EditUser
```

```jsx
/* src/users/components/EditUser.js */
import React from 'react'
import PropTypes from 'prop-types'
import '../styles/item.css';
class EditUser extends React.Component {
    constructor(props) {
        super(props);

        this.nameInput = React.createRef();
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.save();
    }
    render() {
        return (
            <form onSubmit={this.onSubmit} className="item">
                <legend>Edit User id:{this.props.id}</legend>
                <div className="form-group">
                    <label htmlFor="username">username</label>
                    <input ref={this.nameInput} type="text" name="username" className="form-control" id="username"
                        value={this.props.username}
                        onChange={this.props.onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" className="form-control" id="email"
                        value={this.props.email}
                        onChange={this.props.onChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>

        )
    }
}
export default EditUser;


EditUser.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string,
    email: PropTypes.string,
    onChange: PropTypes.func,
    save: PropTypes.func,
}

```

- in the `constructor` assign to `this.nameInput = React.createRef()`.

```jsx
/* src/users/components/EditUser.js */
class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
    }
}
```

- register to `componentDidMount` and `componentDidUpdate` function in the class.
- on `componentDidMount` call to `this.nameInput.current.focus()`.
- on `componentDidMount` check if the `prevProps.id !== this.props.id` and if `true` call to `his.nameInput.current.focus()`.

```jsx
/* src/users/components/EditUser.js */
class EditUser extends React.Component {
    ...
    componentDidMount() {
        this.nameInput.current.focus();
    }

    componentDidUpdate(prevProps) {

        if (prevProps.id !== this.props.id)
            this.nameInput.current.focus();
    }
    ...
}
```

- on the name `<input>` add `ref` property assign it with `this.nameInput`.

```jsx
/* src/users/components/EditUser.js */
class EditUser extends React.Component {
    render() {
        ...
        <input ref={this.nameInput} type="text" name="username" className="form-control" id="username"
        ...
    }
}
```

## HOC high order component

- create new `Logger.js` file in `src/hoc` folder.
- create new function with `WrappedComponent` and `componentName` as arguments and return new `class component` that in the `render` function return `<WrappedComponent {...this.props} />`

```jsx
/* src/hoc/Logger.js */
import React from 'react'
export default (WrappedComponent, componentName) => {
    return class extends React.Component {
        render() {
            return (
                <WrappedComponent {...this.props} />
            )
        }
    }
}
```

- create `log` function that get a message and `console.log` it with the `componentName`
- call to `componentDidMount`,`componentDidUpdate`,`shouldComponentUpdate`,`componentWillUnmount` functions.
- in those function call to `this.log`;

```jsx
/* src/hoc/Logger.js */
import React from 'react'
export default (WrappedComponent, componentName) => {

    return class extends React.Component {
        componentDidMount(){
            this.log('component mounted');
        }

        componentDidUpdate(){
            this.log('component updated');
        }

        shouldComponentUpdate(){
            this.log('component should update');
            return true;
        }
        componentWillUnmount(){
            this.log('component removed');
        }
        log(msg){
            console.log( `[${componentName}] - ${msg}`)
        }
        render() {
            return (
                <WrappedComponent {...this.props} />
            )
        }
    }
}
```

- go to `EditUser` component, import `Logger` HOC and on the `export default` call the `Logger` with the `EditUser` class and a string that `edit user`.

```jsx
/* src/users/components/EditUser.js */
import Logger from '../../hoc/Logger';
...
class EditUser extends React.Component {
    ...
}
...
export default Logger(EditUser,'edit user');

```

## Context

- create new file `theme.context.js` in `src/contexts`
- import `React`, create `themes` object and create `ThemeContext` const
- assign `ThemeContext` with `React.createContext` and call to object that contain `theme` as theme and `toggleTheme` as function.

```jsx
/* src/contexts/theme.context.js */
import React from 'react'
export const themes = {
    light: {
        background: '#eeeeee',
        color: '#222222',
    },
    dark: {
        background: '#222222',
        color: '#eeeeee',
    },
};
const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => { },
});

export default ThemeContext;
```

- create new file `ThemeToggleChange.js` in `src/features/component` folder
- import `React` and `ThemeContext, { themes }` from `theme.context.js`

```jsx
import React from 'react'
import ThemeContext, { themes } from '../../contexts/theme.context';

export default () => {
    return (
        <div></div>
    )
}

```

- return `<ThemeContext.Consumer>` and inside call to JSX expression function that get `{ theme, toggleTheme }` object in the argument.
- return a toggle buttons that call to `toggleTheme`

```jsx
import React from 'react'
import ThemeContext, { themes } from '../../contexts/theme.context';

export default () => {
    return (
        <ThemeContext.Consumer>
            {({ theme, toggleTheme }) => (
                <div class="btn-group" role="group">
                    <button type="button" className={"btn btn-" + (theme === themes.light ? 'primary' : '')} onClick={toggleTheme}>Light</button>
                    <button type="button" className={"btn btn-" + (theme === themes.dark ? 'primary' : '')} onClick={toggleTheme}>Dark</button>
                </div>
            )}
        </ThemeContext.Consumer>
    )
}
```

> the component can return just one `<button>` that toggle the theme.

- in the `App` component import `ThemeToggleChange` and `ThemeContext, { themes }`

```jsx
/* src/App.js */
...
import ThemeToggleChange from './features/components/ThemeToggleChange';
import ThemeContext, { themes } from './contexts/theme.context';
export default class App extends Component {
...
}
```

- create new function in the class `toggleTheme`
- the function `setState` of the `theme` base on the previous theme on the `oldState`.

```jsx
/* src/App.js */
...
export default class App extends Component {
    toggleTheme = () => {
        this.setState(state => ({
            theme:
                state.theme === themes.dark
                    ? themes.light
                    : themes.dark,
        }));
    };
}
```

- in the constructor add to `this.state` `theme` and `toggleTheme`
- the `theme`  is the default theme and the `toggleTheme` is `this.toggleTheme`

```diff
/* src/App.js */
...
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            startIndex: 0,
            inPage: 3,
+            theme: themes.light,
+            toggleTheme: this.toggleTheme,
        }
    }
}
```

- on the render function create new `themeContextObj` the contain `theme` and `toggleTheme` from `this.state`

```diff
/* src/App.js */
...
export default class App extends Component {
    render() {
        let style = {
            width: '600px',
            margin: `10px auto`
        }
        let editUser = ''
        if (this.state.editUser) {
            editUser = <EditUser {...this.state.editUser}
                save={this.saveEditUser}
                onChange={this.editUserChange} />
        }
+        const themeContextObj = {
+            theme: this.state.theme,
+            toggleTheme: this.state.toggleTheme
+        }
        return (
            ...
        );
    }
}
```

```jsx
/* src/App.js */
...
export default class App extends Component {
    render() {

        const themeContextObj = {
            theme: this.state.theme,
            toggleTheme: this.state.toggleTheme
        }
        return (
            ...
        );
    }
}
```

- wrap the return JSX element with `<ThemeContext.Provider value={themeContextObj}>` and add `<ThemeToggleChange />`
after the `<h1>` element

```diff
/* src/App.js */
...
export default class App extends Component {
    render() {
        ...
        const themeContextObj = {
            theme: this.state.theme,
            toggleTheme: this.state.toggleTheme
        }
        return (
+            <ThemeContext.Provider value={themeContextObj}>
                <div style={style}>
                    <h1> User Admin </h1>
+                    <ThemeToggleChange />
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
                </div>
+            </ThemeContext.Provider>
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
        let editUser = ''
        if (this.state.editUser) {
            editUser = <EditUser {...this.state.editUser}
                save={this.saveEditUser}
                onChange={this.editUserChange} />
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
                </div>
            </ThemeContext.Provider>
        )
    }
}
```

- go to `src/user/styles/item.css` and remove the `background` and `color` properties.

```diff
.item {
    width: auto;
    border-radius: 10px;
    border: solid 1px lightgray;
    padding: 10px;
-    background: whitesmoke;
-    color:black;
}
```

```css
.item {
    width: auto;
    border-radius: 10px;
    border: solid 1px lightgray;
    padding: 10px;
    background: whitesmoke;
    color:black;
}
```

## Theme HOC

- create new file `ApplyTheme.js` on `src/hoc` folder
- import `React`
- on that file `export default` function that get `WrappedComponent` as argument and return a function with argument of spread `props` and return the `WrappedComponent` withe the spread `props`

```jsx
/* src/hoc/ApplyTheme.js */
import React from 'react'

export default (WrappedComponent) => {
    return ({ ...props }) => (
        <WrappedComponent {...props} />
    )
}
```

- import `ThemeContext` from `theme.context` and wrap the `WrappedComponent` with `<ThemeContext.Consumer>` and inside call JSX expression with function that get `obj` as argument.
- wrap the `<WrappedComponent>` again but this time with `<div>` element with `style` attribute that assign with `obj.theme` as JSX expression.

```diff
import React from 'react'
import ThemeContext from './../contexts/theme.context';

export default (WrappedComponent) => {
    return ({ ...props }) => (
+        <ThemeContext.Consumer>
+            {(obj) => (
+              <div style={obj.theme}>
                <WrappedComponent {...props} />
+            </div>
+            )}
+      </ThemeContext.Consumer>
    )
}
```

```jsx
/* src/hoc/ApplyTheme.js */
import React from 'react'
import ThemeContext from './../contexts/theme.context';

export default (WrappedComponent) => {
    return ({ ...props }) => (
        <ThemeContext.Consumer>
            {(obj) => (
              <div style={obj.theme}>
                <WrappedComponent {...props} />
            </div>
            )}
      </ThemeContext.Consumer>
    )
}
```

- import `ApplyTheme` to `EditUser` and `User` components and `export default` the component wrap in the HOC `ApplyTheme`

```diff
/* src/users/components/EditUser.js */

import React from 'react'
import PropTypes from 'prop-types'
import Logger from '../../hoc/Logger';
+ import ApplyTheme from '../../hoc/ApplyTheme';
import '../styles/item.css';
class EditUser extends React.Component {
...
}
-export default Logger(EditUser,'edit user');
+export default ApplyTheme(Logger(EditUser,'edit user'));


```

```jsx
/* src/users/components/EditUser.js */

import React from 'react'
import PropTypes from 'prop-types'
import Logger from '../../hoc/Logger';
import ApplyTheme from '../../hoc/ApplyTheme';
import '../styles/item.css';
class EditUser extends React.Component {
...
}
export default ApplyTheme(Logger(EditUser,'edit user'));

```

```diff
/* src/users/components/User.js */

import React from 'react'
import PropTypes from 'prop-types';
import '../styles/item.css'
+import ApplyTheme from '../../hoc/ApplyTheme';
-export default function User(props) {
+function User(props) {
    return (
        <div className="item">
            <div>
                id: {props.id}
            </div>
            <div>
                username: {props.username}
            </div>
            <div>
                email: {props.email}
            </div>
        </div>
    )
}
User.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
}
+export default ApplyTheme(User);
```

```jsx
/* src/users/components/User.js */

import React from 'react'
import PropTypes from 'prop-types';
import '../styles/item.css'
import ApplyTheme from '../../hoc/ApplyTheme';
export default function User(props) {
function User(props) {
    return (
        <div className="item">
            <div>
                id: {props.id}
            </div>
            <div>
                username: {props.username}
            </div>
            <div>
                email: {props.email}
            </div>
        </div>
    )
}
User.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
}
export default ApplyTheme(User);

```