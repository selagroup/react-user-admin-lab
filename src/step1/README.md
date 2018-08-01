## step 1

### create your first component

- under `src` create new folder, `users`. on that folder create new folder `components` (`src/users/components`).
- in this folder create  `User.js` file:

```jsx
/* src/users/components/User.js */
import React from 'react'
export default () => {
    return (
        <div className="item">
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
    )
}
```

- on the `src/users` create new folder `styles`.
- in this folder create new `css` file `user.css`.

```css
/* src/users/styles/item.css */
.item{
   width: 300px;
   border-radius: 10px;
   border: solid 1px lightgray;
   padding: 10px;
}
```

- in `User` component, add the item `css`

```jsx
/* src/users/components/User.js */
import React from 'react'
import '../style/item.css'
...
```

- in `App.js` file, import the `User` element.

```jsx
/* src/App.js */
import User from 'users/components/User'
```

- remove all the `jsx` that return from the `render` function and return the `User` Element
- add `h1` element with `User Admin` text

```jsx
/* src/App.js */
...
render() {
    return (
        <div>
            <h1> User Admin </h1>
            <User/>
        </div>
    )
}
...
```

- in the `App` element render function create a `let` style variable and add `margin` and `width` to it.
- add this style to the `div` wrapper element

```jsx
/* src/App.js */
...
render() {
    let style = {
        width: '600px',
        margin: `10px auto`
    }
    return (
        <div style={style}>
            <h1> User Admin </h1>
            <User/>
        </div>
    )
}
...

```
