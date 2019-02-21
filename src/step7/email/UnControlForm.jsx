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
                    <select className="form-control" id="email_user"
                         ref={this.userIdRef}
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
