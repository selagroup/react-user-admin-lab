import React from 'react'
export const themes = {
    light: {
        background: '#eeeeee',
        color: '#222222',
    },
    dark: {
        background: '#222222',
        color: '#eeeeee',
    },
};
const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => { },
});

export default ThemeContext;
