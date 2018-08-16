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