import React, { Component } from 'react'
import User from '../users/components/User'
import Pagination from '../users/components/Pagination';
import UsersApi from '../api/users'
import { Link } from 'react-router-dom';
export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            startIndex: 0,
            inPage: 3,
        }
    }
    async componentDidMount() {
        const users = await UsersApi.getUsers();
        this.setState({
            users
        })
    }
    nextPage = (e) => {
        this.setState({
            startIndex: e.startIndex,
            editUser: null
        })
    }
    render() {
        return (

            <div className="col-sm-12 list-group">
                <ul className="list-group">
                    <Pagination inPage={this.state.inPage} startIndex={this.state.startIndex} nextPage={this.nextPage}>
                        {this.state.users
                            .map((u) => {
                                u.active = (this.state.editUser ? u.id === this.state.editUser.id ? 'active' : '' : '')
                                return u
                            })
                            .map((u) => (
                                <li key={u.id}
                                    className={"list-group-item " + u.active}
                                >
                                    <Link to={"/user/" + u.id}>
                                        <User {...u} />
                                    </Link>

                                </li>
                            ))}
                    </Pagination>
                </ul>
            </div>
        )
    }
}
