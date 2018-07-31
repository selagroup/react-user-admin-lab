import React, { Component } from 'react';
import UserApi from './api/UserApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import User from './components/User';
import NotFound from './components/NotFound';
import UserList from './components/UserList';
import './App.css';
import EditUser from './components/EditUser';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      focusUser: void 0,
      users: []
    };
    UserApi.asPromise().then((users) => {
      this.setState({
        users
      })
    })
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
  bindEditUserById = (props) => {
    let id = Number(props.match.params.id);
    if (!Number(id)) return <NotFound />

    let focusUser = this.state.users.filter((u) => u.id === id)[0];
    if (!focusUser) return <NotFound />
    let afterSave = (updateUser) => {
      this.save(updateUser);
      props.history.push('/users');
    }
    return <EditUser {...props} key={focusUser.id} save={afterSave} defaultId={focusUser.id} defaultUsername={focusUser.username} defaultEmail={focusUser.email} />
  }
  render() {
    let focusUser = this.state.focusUser;
    return (
      <div>
        <h1>User Admin</h1>
        <div className='container-fluid'>
          <Router>
            <Switch>
              <Route path='/edit/:id' component={this.bindEditUserById} />
              <Route path='/users'>
                <UserList>
                  {this.state
                    .users
                    .map((user, i) =>
                      <Link to={'/edit/' + user.id} key={i}>
                        <User
                          onClick={this.focus}
                          selected={focusUser && focusUser.id === user.id}
                          id={user.id}
                          username={user.username}
                          email={user.email} />
                      </Link>)
                  }
                </UserList>
              </Route>
              <Redirect from='/' to='/users' />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
