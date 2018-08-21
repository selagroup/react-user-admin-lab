import React, { Component } from 'react'
import EditUser from '../users/components/EditUser';
import UsersApi from '../api/users';
import { withRouter } from 'react-router-dom';

class UserDetails extends Component {
    constructor() {
        super()
        this.state = {
            userRequested: false
        }
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            this.setState({
                user: await UsersApi.getUserById(this.props.match.params.id)
            })
        }
    }
    updateUser = async () => {
        await UsersApi.updateUser(this.state.user);
        this.props.history.push('/')

    }
    deleteUser = async () => {
        await UsersApi.deleteUser(this.state.user.id);
        this.props.history.push('/')
    }
    createUser = async () => {
        await UsersApi.createUser(this.state.user);
        this.props.history.push('/')

    }
    userChange = (e) => {
        let user = {
            [e.target.name]: e.target.value
        }
        this.setState((oldState) => {
            return {
                user: {
                    ...oldState.user,
                    ...user,
                }
            }
        })
    }
    render() {
        if (!this.props.match.params.id) {
            return (
                <EditUser
                    save={this.createUser}
                    onChange={this.userChange} />
            )
        }
        else if (this.state.user) {
            return (
                <EditUser {...this.state.user}
                    save={this.updateUser}
                    delete={this.deleteUser}
                    onChange={this.userChange} />)
        } else if (this.state.userRequested) {
            return <h2> User id: {this.props.match.params.id} not found</h2>
        }
        else {
            return <h2> getting user data</h2>
        }
    }
}

export default withRouter(UserDetails);
