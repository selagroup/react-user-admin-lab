# React User Admin Lab

## step 0
### create react app

- download node and npm
- install the react boiler plate CLI
```sh
npm i -g create-react-app
```
- create your add
```sh
create-react-app <app-name>
```
- run the app for the first time.
```sh
cd <app-name>
yarn start
```


## step 1
### create your first component

- under `src` create new folder, components.
- in this folder create two new files:
```jsx
/* User.js */
import React from 'react'
import PropTypes from 'prop-types';
export default class User extends React.Component {
    render() {
        return (
            <div className="user-item">
                <div>
                    id:1
                </div>
                <div>
                    username:johndoe
                </div>
                <div>
                    email:johndoe@gmail.com
                </div>
            </div>
        );
    }
}
```
```css
/* User.css */

```

  
