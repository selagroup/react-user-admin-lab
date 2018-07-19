import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import User from './components/User';
import NotFound from './components/NotFound';
import UserList from './components/UserList';
import './App.css';
import EditUser from './components/EditUser';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

class App extends Component {

  save = (updateUser) => {
    this.props.updateUser(updateUser)
  }
  bindEditUserById = (props) => {
    let id = Number(props.match.params.id);
    if (!Number(id)) return <NotFound />

    let focusUser = this.props.users.filter((u) => u.id === id)[0];
    if (!focusUser) return <NotFound />
    let afterSave = (updateUser) => {
      this.save(updateUser);
      props.history.push('/users');
    }
    return <EditUser {...props} key={focusUser.id} save={afterSave} defaultId={focusUser.id} defaultUsername={focusUser.username} defaultEmail={focusUser.email} />
  }
  render() {
    return (
      <div>
        <h1>User Admin</h1>
        <div className='container-fluid'>
          <Router>
            <Switch>
              <Route path='/edit/:id' component={this.bindEditUserById} />
              <Route path='/users'>
                <UserList>
                  {this.props.users
                    .map((user, i) =>
                      <Link to={'/edit/' + user.id} key={i}>
                        <User
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
