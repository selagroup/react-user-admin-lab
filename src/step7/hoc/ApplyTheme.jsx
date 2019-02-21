import React from 'react'
import ThemeContext from '../contexts/theme.context';

export default (WrappedComponent) => {
    return ({ ...props }) => (
        <ThemeContext.Consumer>
            {(obj) => (
              <div style={obj.theme}>
                <WrappedComponent {...props} />
            </div>
            )}
      </ThemeContext.Consumer>
    )
}
