import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import User from './components/User';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>User Admin</h1>
        <div className='container-fluid'>
          <User/>
        </div>
      </div>
    );
  }
}

export default App;
