# step 7

## create control form

- create new folder `email` under the `src` folder.
- on that folder create new file `ControlForm.js`.
- in that file create new class component.
- import `PropTypes from 'prop-types'`.
- assign to `ControlForm` `propsTypes` with object that get `onSendEmail` as `PropTypes.func.isRequired` and `users` with `PropTypes.array.isRequired`

```jsx
/* src/email/ControlForm.js */
import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class ControlForm extends Component {
}

ControlForm.propTypes = {
    onSendEmail: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
}

```

- in the constructor, that get `props` as argument. assign to `this.state` an object with `selectUser` that with `props.users[0] || {}`

```jsx
/* src/email/ControlForm.js */
import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class ControlForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: props.users[0] || {}
        }
    }
}
```

- add `componentWillReceiveProps` life cycle method with `nextProps` as argument.
- assign `const selectedUser` with `nextProps.users[0] || {}`.
- call `this.setState` with `selectedUser`.

```jsx
/* src/email/ControlForm.js */

export default class ControlForm extends Component {
    componentWillReceiveProps(nextProps) {
        const selectedUser = nextProps.users[0] || {};
        this.setState({
            selectedUser
        })
    }
}
```

- create three `handle` function with `event` as argument
- `handleUserChange`, [`Array.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) the selected user, from `this.props.user` base on the `event.target.value` and call `this.setState` with the `selectedUser`
- `handleContentChange`, call `this.setState` with `content: event.target.value`
- `handleSubmit`, `preventDefault` and call to `this.props.onSendEmail` with the `selectedUser` email and the content from the `state.content`.

```jsx
/* src/email/ControlForm.js */

export default class ControlForm extends Component {
    ...
    handleUserChange = (event) => {
        const selectedUser = this.props.users.find((u) => u.id === parseInt(event.target.value, 10));
        this.setState({
            selectedUser
        })
    }
    handleContentChange = (event) => {
        this.setState({
            content: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSendEmail({
            email: this.state.selectedUser.email,
            from: `ControlForm`,
            content: this.state.content,
        })
    }
}
```

- call the `render` function and return `form` that contain `<select>` and `<textarea>` target.

```jsx
/* src/email/ControlForm.js */
export default class ControlForm extends Component {
    ...
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email_user">User</label>
                    <select className="form-control" id="email_user">
                    </select>
                </div>
                <div className="form-group">
                    <label>Email: {this.state.selectedUser.email}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="email_content">Content</label>
                    <textarea name='content' className="form-control" id="email_content" rows="3"/>
                </div>
                <button type="submit" className="btn btn-success">send</button>
            </form>
        )
    }
}
```

- on the `<select>` element call JSX expression that `map` `this.props.user` to `<option>` element with `user.id` as `value` and `user.username` as text (don't forget to add `key` property to the `<option>` element).

```diff
/* src/email/ControlForm.js */
export default class ControlForm extends Component {
    ...
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email_user">User</label>
                    <select className="form-control" id="email_user">
+                        {this.props.users.map((u, i) => (
+                            <option key={i} value={u.id}>{u.username}</option>
+                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Email: {this.state.selectedUser.email}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="email_content">Content</label>
                    <textarea name='content' className="form-control" id="email_content" rows="3"/>
                </div>
                <button type="submit" className="btn btn-success">send</button>
            </form>
        )
    }
}
```

- to the some `<select>` element add `value` property with `this.state.selectedUser.id` and `onChange` with `this.handleUserChange`
- on the `<textarea>` element add `value` property with `this.state.content` and `onChange` with `this.handleContentChange`

```diff
/* src/email/ControlForm.js */
export default class ControlForm extends Component {
    ...
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email_user">User</label>
-                    <select className="form-control" id="email_user">
+                    <select className="form-control" id="email_user"
+                        value={this.state.selectedUser.id}
+                        onChange={this.handleUserChange}>
                        {this.props.users.map((u, i) => (
                            <option key={i} value={u.id}>{u.username}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Email: {this.state.selectedUser.email}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="email_content">Content</label>
-                    <textarea name='content' className="form-control" id="email_content" rows="3"/>
+                    <textarea name='content' className="form-control" id="email_content" rows="3"
+                        value={this.state.content}
+                        onChange={this.handleContentChange} />
                </div>
                <button type="submit" className="btn btn-success">send</button>
            </form>
        )
    }
}
```

```jsx
/* src/email/ControlForm.js */
import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class ControlForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: props.users[0] || {}
        }
    }
    componentWillReceiveProps(nextProps) {
        const selectedUser = nextProps.users[0] || {};
        this.setState({
            selectedUser
        })
    }
    handleUserChange = (event) => {
        const selectedUser = this.props.users.find((u) => u.id === parseInt(event.target.value, 10));
        this.setState({
            selectedUser
        })
    }
    handleContentChange = (event) => {
        this.setState({
            content: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSendEmail({
            email: this.state.selectedUser.email,
            from: `ControlForm`,
            content: this.state.content,
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email_user">User</label>
                    <select className="form-control" id="email_user"
                        value={this.state.selectedUser.id}
                        onChange={this.handleUserChange}>
                        {this.props.users.map((u, i) => (
                            <option key={i} value={u.id}>{u.username}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Email: {this.state.selectedUser.email}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="email_content">Content</label>
                    <textarea name='content' className="form-control" id="email_content" rows="3"
                        value={this.state.content}
                        onChange={this.handleContentChange} />
                </div>
                <button type="submit" className="btn btn-success">send</button>
            </form>
        )
    }
}

ControlForm.propTypes = {
    onSendEmail: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
}
```

## un-control form

- copy paste the `src/email/ControlForm.js` to `src/email/UnControlForm.js`.
- change the name of the class to `UnControlForm`.

```diff
/* src/email/UnControlForm.js */
-export default class ControlForm extends Component {
+export default class UnControlForm extends Component {
    constructor(props) {
        super(props);
+        this.userIdRef = React.createRef();
+        this.contentRef = React.createRef();
        this.state = {
            selectedUser: props.users[0] || {}
        }
    }
}
-ControlForm.propTypes = {
+UnControlForm.propTypes = {
    onSendEmail: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
}
```

- in the constructor create `this.userIdRef` and `this.contentRed` and assign them both to `React.createRef()`.

```diff
/* src/email/UnControlForm.js */
export default class UnControlForm extends Component {
    constructor(props) {
        super(props);
+        this.userIdRef = React.createRef();
+        this.contentRef = React.createRef();
        this.state = {
            selectedUser: props.users[0] || {}
        }
    }
}
```

- remove `handleContentChange` function.
- on the `handleSubmit` change `this.state.content` to `this.contentRef.current.value`

```diff
/* src/email/UnControlForm.js */
export default class UnControlForm extends Component {
    ...
-    handleContentChange = (event) => {
-        this.setState({
-            content: event.target.value
-        })
-    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSendEmail({
            email: this.state.selectedUser.email,
-            from: `ControlForm`,
-            content: this.state.content,
+            from: `UnControlForm`,
+            content: this.contentRef.current.value,
        })
    }
}
```

- on the render function in the `<select>` element remove `value={this.state.selectedUser.id}` to `ref={this.userIdRef}` and on the `<textarea>` element remove `value` and `change` and add `ref={this.contentRef}`

```diff
/* src/email/UnControlForm.js */
export default class UnControlForm extends Component {
    ...
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email_user">User</label>
                    <select className="form-control" id="email_user"
-                        value={this.state.selectedUser.id}
+                       ref={this.userIdRef}
                        onChange={this.handleUserChange} >
                        {this.props.users.map((u, i) => (
                            <option key={i} value={u.id}>{u.username}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Email: {this.state.selectedUser.email}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="email_content">Content</label>
                    <textarea name='content' className="form-control" id="email_content" rows="3"
-                        value={this.state.content}
-                        onChange={this.handleContentChange} />
+                        ref={this.contentRef} />
                </div>
                <button type="submit" className="btn btn-success">send</button>
            </form>
        )
    }
}
```

```jsx
/* src/email/UnControlForm.js */
import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class UnControlForm extends Component {
    constructor(props) {
        super(props);
        this.userIdRef = React.createRef();
        this.contentRef = React.createRef();
        this.state = {
            selectedUser: props.users[0] || {}
        }
    }
    componentWillReceiveProps(nextProps) {
        const selectedUser = nextProps.users[0] || {};
        this.setState({
            selectedUser
        })
    }
    handleUserChange = (event) => {
        const selectedUser = this.props.users.find((u) => u.id === parseInt(event.target.value, 10));
        this.setState({
            selectedUser
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSendEmail({
            email: this.state.selectedUser.email,
            from: `UnControlForm`,
            content: this.contentRef.current.value,
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email_user">User</label>
                    <select className="form-control" id="email_user" onChange={this.handleUserChange}
                         ref={this.userIdRef}>
                        {this.props.users.map((u, i) => (
                            <option key={i} value={u.id}>{u.username}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Email: {this.state.selectedUser.email}</label>
                </div>
                <div className="form-group">
                    <label htmlFor="email_content">Content</label>
                    <textarea name='content' className="form-control" id="email_content" rows="3" 
                        ref={this.contentRef} />
                </div>
                <button type="submit" className="btn btn-success">send</button>
            </form>
        )
    }
}

UnControlForm.propTypes = {
    onSendEmail: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
}
```

## add send mail routing

- create new class component `src/pages/SendMail.js` with  `ControlForm`, `UnControlForm`, `UserApi` and `{ withRouter }` imports.
- on the constructor create `this.state` object with `users` as array and `selectedUser` as empty object.
- add `componentDidMount` live-cycle method, to the class, as `async` function.
- create `SendMail` function that get `events`, `console.log` the event and call to `this.props.history.push('/')`.
- on the `render` function check, if `this.props.match.type === 'control'` then display the `<ControlForm>` element, else the `<UnControlForm>` element.
- `export default` the `SendMail` class wrap with `withRoute`

```jsx
/* src/pages/SendMail.js */
import React, { Component } from 'react'
import ControlForm from '../email/ControlForm';
import UnControlForm from '../email/UnControlForm';
import UserApi from '../api/users';
import { withRouter } from 'react-router-dom';

class SendMail extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            selectedUser: {
            }
        }
    }
    async componentDidMount() {
        const users = await UserApi.getUsers();
        this.setState({
            users,
            selectedUser: users[0]
        })
    }
    send = (event) => {
        console.log('sending mail => ', event);
        this.props.history.push('/');
    }
    render() {
        if (this.props.match.params.type === 'control') {
            return (
                <React.Fragment>
                    <h2>Control Form</h2>
                    <ControlForm onSendEmail={this.send} users={this.state.users} />
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <h2>Un-Control Form</h2>
                    <UnControlForm onSendEmail={this.send} users={this.state.users} />
                </React.Fragment>
            )
        }
    }
}

export default withRouter(SendMail);
```
