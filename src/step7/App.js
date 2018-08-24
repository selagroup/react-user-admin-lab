import React, { Component } from 'react'
import Home from './pages/Home'
import UserDetails from './pages/UserDetails'
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import ThemeToggleChange from './features/components/ThemeToggleChange';
import ThemeContext, { themes } from './contexts/theme.context';
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            theme: themes.light,
            toggleTheme: this.toggleTheme,
        }
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
        const themeContextObj = {
            theme: this.state.theme,
            toggleTheme: this.state.toggleTheme
        }
        return (
            <ThemeContext.Provider value={themeContextObj}>
                <BrowserRouter>
                    <div style={style}>
                        <h1> User Admin </h1>
                        <nav className="navbar navbar-expand-sm bg-light">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <span className="nav-link"><NavLink to="/" exact >Home</NavLink></span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link"><NavLink to="/user/create" exact >Create</NavLink></span>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                <ThemeToggleChange />
                            </ul>
                        </nav>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/user/create" component={UserDetails} />
                            <Route path="/user/:id" component={UserDetails} />
                            <Route render={() => <h2> Page not found!</h2>} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </ThemeContext.Provider>
        )
    }
}
