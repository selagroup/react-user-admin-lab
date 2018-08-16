# step 5

- create new file `Pagination.js` in `src/users/components/`.
- in that file create new `function component`.
- assign to the `Pagination` function `propsTypes` with `startIndex`, `inPage` of type number that require and `nextPage` of type function that require also.

```jsx
/* src/users/components/Pagination.js */
import React from 'react'
import PropTypes from 'prop-types';
export default function Pagination(props) {
    return (
        <div></div>
    )
}
Pagination.propTypes = {
    startIndex: PropTypes.number.isRequired,
    inPage: PropTypes.number.isRequired,
    nextPage: PropTypes.func.isRequired,
}
```

- create two new function, `onNext` and `onPrev`
- those function should call to `props.nextPage` with new `startIndex` base on going next page or previous page.

```jsx
/* src/users/components/Pagination.js */
...
export default function Pagination(props) {
    const onPrev = () => {
        let startIndex = props.startIndex - props.inPage;
        if (startIndex >= 0) {
            props.nextPage({ startIndex });
        }
    }
    const onNext = () => {
        let startIndex = props.startIndex + props.inPage;
        if (startIndex < props.children.length) {
            props.nextPage({ startIndex });
        }
    }
    ...
}
...
```

- return a `React.Fragment` component that contain two buttons, prev and next.
- under that buttons using `jsx expression`, wrap the `props.children` with `Array` function and `slice` it from the `props.startIndex` to `props.startIndex + props.inPage`

```jsx
/* src/users/components/Pagination.js */
...
export default function Pagination(props) {
    ...
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-6">
                    <button onClick={onPrev} type="button" className="list-group-item list-group-item-action">Prev</button>
                </div>
                <div className="col-sm-6">
                    <button onClick={onNext} type="button" className="list-group-item list-group-item-action">Next</button>
                </div>
            </div>
            {Array(...props.children).slice(props.startIndex, props.startIndex + props.inPage)}
        </React.Fragment>
    )
}
...
```

- the final file should be

```jsx
/* src/users/components/Pagination.js */
import React from 'react'
import PropTypes from 'prop-types';

export default function Pagination(props) {
    const onPrev = () => {
        let startIndex = props.startIndex - props.inPage;
        if (startIndex >= 0) {
            props.nextPage({ startIndex });
        }
    }
    const onNext = () => {
        let startIndex = props.startIndex + props.inPage;
        if (startIndex < props.children.length) {
            props.nextPage({ startIndex });
        }
    }
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-6">
                    <button onClick={onPrev} type="button" className="list-group-item list-group-item-action">Prev</button>
                </div>
                <div className="col-sm-6">
                    <button onClick={onNext} type="button" className="list-group-item list-group-item-action">Next</button>
                </div>
            </div>
            {Array(...props.children).slice(props.startIndex, props.startIndex + props.inPage)}
        </React.Fragment>
    )
}
Pagination.propTypes = {
    startIndex: PropTypes.number.isRequired,
    inPage: PropTypes.number.isRequired,
    nextPage: PropTypes.func.isRequired,
}
```