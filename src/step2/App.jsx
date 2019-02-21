import React, { Component } from 'react'
import User from './users/components/User'
import EditUser from './users/components/EditUser';
import UsersApi from './api/users'
import 'bootstrap/dist/css/bootstrap.min.css'
export default class App extends Component {
    constructor() {
        super();
        let user = UsersApi.getUserByIdSync(1);
        this.state = {
            selectedUser: user,
            editUser: user
        }
    }
    saveEditUser = () => {
        this.setState((oldState) => {
            return {
                selectedUser: {
                    ...oldState.selectedUser,
                    ...oldState.editUser,
                }
            }
        })
    }
    editUserChange = (e) => {
        let editUser = {
            [e.target.name]: e.target.value
        }
        this.setState((oldState) => {
            return {
                editUser: {
                    ...oldState.selectedUser,
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
        return (
            <div style={style}>
                <h1> User Admin </h1>
                <div className="row">
                    <div className="col-xs-12 col-sm-8">
                        <User {...this.state.selectedUser} />
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <EditUser {...this.state.editUser}
                            save={this.saveEditUser}
                            onChange={this.editUserChange} />
                    </div>
                </div>
            </div>
        )
    }
}
