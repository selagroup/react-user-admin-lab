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