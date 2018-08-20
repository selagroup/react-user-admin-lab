import React from 'react'
import ThemeContext, { themes } from '../../contexts/theme.context';

export default () => {
    return (
        <ThemeContext.Consumer>
            {({ theme, toggleTheme }) => (
                <div class="btn-group" role="group">
                    <button type="button" className={"btn btn-" + (theme === themes.light ? 'primary' : '')} onClick={toggleTheme}>Light</button>
                    <button type="button" className={"btn btn-" + (theme === themes.dark ? 'primary' : '')} onClick={toggleTheme}>Dark</button>
                </div>
            )}
        </ThemeContext.Consumer>
    )
}
