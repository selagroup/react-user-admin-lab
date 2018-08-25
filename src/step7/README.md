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
