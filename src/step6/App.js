import React, { Component } from 'react'
import User from './users/components/User'
import Pagination from './users/components/Pagination';
import EditUser from './users/components/EditUser';
import UsersApi from './api/users'
import 'bootstrap/dist/css/bootstrap.min.css'
import ThemeToggleChange from './features/components/ThemeToggleChange';
import ThemeContext, { themes } from './contexts/theme.context';
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            startIndex: 0,
            inPage: 3,
            theme: themes.light,
            toggleTheme: this.toggleTheme,
        }
    }
    async componentDidMount() {
        const users = await UsersApi.getUsers();
        this.setState({
            users
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
    saveEditUser = async () => {
        let editUser = await UsersApi.updateUser(this.state.editUser);
        this.setState((oldState) => ({
            editUser,
            users: oldState.users.map((u) => u.id !== editUser.id ? u : editUser)
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
    nextPage = (e) => {
        this.setState({
            startIndex: e.startIndex,
            editUser: null
        })
    }
    toggleTheme = () => {
        this.setState(oldState => ({
            theme:
                oldState.theme === themes.dark
                    ? themes.light
                    : themes.dark,
        }));
    };
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
