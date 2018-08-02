import React, { Component } from 'react'
import User from './users/components/User'
import EditUser from './users/components/EditUser';
import UsersApi from './api/users'
import 'bootstrap/dist/css/bootstrap.min.css'
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        this.setState({
            users: UsersApi.getUsersSync()
        })
    }
    selectUser = (id) => {
        this.setState((oldState) => {
            const editUser = { ...oldState.users.find((u) => id === u.id) };
            return {
                editUser
            }
        })
    }
    saveEditUser = () => {
        this.setState((oldState) => ({
            users: UsersApi.updateUserSync(oldState.editUser)
        }))
    }
    editUserChange = (e) => {
        let editUser = {
            [e.target.name]: e.target.value
        }
        this.setState((oldState) => {
            return {
                editUser: {
                    ...oldState.editUser,
                    ...editUser,
                }
            }
        })
    }
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
        return (
            <div style={style}>
                <h1> User Admin </h1>
                <div className="row">
                    <div className="col-xs-12 col-sm-8 list-group">
                        <ul className="list-group">
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
                        </ul>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        {editUser}
                    </div>
                </div>
            </div>
        )
    }
}
