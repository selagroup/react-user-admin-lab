import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import User from './components/User';
import './App.css';
import EditUser from './components/EditUser';

class App extends Component {
  render() {
    return (
      <div>
        <h1>User Admin</h1>
        <div className='container-fluid'>
          <EditUser id={1} username={'johndoe'} email={'johndoe@gmail.com'} />
          <User id={1} username={'johndoe'} email={'johndoe@gmail.com'} />
        </div>
      </div>
    );
  }
}

export default App;
