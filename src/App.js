import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import User from './components/User';
import './App.css';
import EditUser from './components/EditUser';

class App extends Component {
  constructor() {
    super();
    this.state = {
      focusUser: {
        id: 1,
        username: 'johndoe',
        email: 'johndoe@gmail.com',
      }
    }
  }
  save = (updateUser) => {
    this.setState({
      focusUser: {...updateUser}
    })
  }
  render() {
    return (
      <div>
        <h1>User Admin</h1>
        <div className='container-fluid'>
          <EditUser save={this.save} id={this.state.focusUser.id} username={this.state.focusUser.username} email={this.state.focusUser.email} />
          <User id={this.state.focusUser.id} username={this.state.focusUser.username} email={this.state.focusUser.email} />
        </div>
      </div>
    );
  }
}

export default App;
