import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import User from './components/User';
import './App.css';
import EditUser from './components/EditUser';

class App extends Component {
  constructor() {
    super();
    this.state = {
      focusUser: void 0,
      users: [
        {
          id: 1,
          username: 'johndoe',
          email: 'johndoe@gmail.com',
        },
        {
          id: 2,
          username: 'janedoe',
          email: 'janedoe@gmail.com',
        },
        {
          id: 3,
          username: 'johnsmith',
          email: 'johnsmith@gmail.com',
        },
        {
          id: 4,
          username: 'janesmith',
          email: 'janesmith@gmail.com',
        }
      ]
    };
  }
  save = (updateUser) => {
    let users = this.state.users.map((u) => {
      if (u.id === updateUser.id) {
        return {
          ...updateUser
        }
      } else {
        return u;
      }
    })
    this.setState({
      users: users
    })
  }
  focus = (id) => {
    let focusUser = this.state.users.filter((u) => u.id === id)[0]
    this.setState({
      focusUser: { ...focusUser }
    })
  }
  render() {
    let focusUser = this.state.focusUser;
    let editTag = focusUser ?
      <EditUser key={this.state.focusUser.id} save={this.save} defaultId={this.state.focusUser.id} defaultUsername={this.state.focusUser.username} defaultEmail={this.state.focusUser.email} />
      : '';

    return (
      <div>
        <h1>User Admin</h1>
        <div className='container-fluid'>
          {editTag}
          {this.state
            .users
            .map((user, i) =>
              <User
                onClick={this.focus}
                selected={focusUser && focusUser.id === user.id} 
                key={i}
                id={user.id}
                username={user.username}
                email={user.email}/>)
          }
        </div>
      </div>
    );
  }
}

export default App;
