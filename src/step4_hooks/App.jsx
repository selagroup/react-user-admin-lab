import React, { useState, useEffect } from 'react'
import User from './users/components/User'
import EditUser from './users/components/EditUser';
import UsersApi from './api/users'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
            UsersApi.getUsers()
                .then(res => setUsers(res))
                .catch(() => console.log('ERROR GETTING USERS!!!!!'));
            return ()=>{};    
        }
    );

    const selectUser = (id) => {
        setEditUser({ ...users.find((u) => id === u.id) });
    }
    
    const saveEditUser = () => {
        UsersApi.updateUser(editUser).then((user) => {
            setEditUser({ ...user});
            setUsers(users.map((u) => u.id !== user.id ? u : user))
        });
    }

    function editUserChange (e) {
        setEditUser({ 
            ...editUser,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div style={{width: '600px',margin: `10px auto`}}>
            <h1> User Admin </h1>
            <div className="row">
                <div className="col-xs-12 col-sm-8 list-group">
                    <ul className="list-group">
                        {users
                            .map((u) => {
                                u.active = (editUser ? u.id === editUser.id ? 'active' : '' : '')
                                return u
                            })
                            .map((u) => (
                                <li key={u.id}
                                    onClick={() => {selectUser(u.id)}}
                                    className={"list-group-item " + u.active}
                                >
                                    <User {...u} />
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-4">
                    {editUser ? ( 
                        <EditUser {...editUser}
                            save={saveEditUser}
                            onChange={editUserChange} />
                        ) : (<span>No seleted user</span>)}
                </div>
            </div>
        </div>
    )
    
}
