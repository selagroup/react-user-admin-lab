import React, { Component } from 'react'
import Home from './pages/Home'
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
                <div style={style}>
                    <h1> User Admin </h1>
                    <ThemeToggleChange />
                    <Home/>
                 </div>
            </ThemeContext.Provider>
        )
    }
}
