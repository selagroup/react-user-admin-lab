import React from 'react';
export default function UserList(props) {
    return (
        <React.Fragment>
            <hr/>
            <p>there are {React.Children.count(props.children)} users.</p>
            <div className='list-group'>
                {props.children.map((user, i) =>
                    <div key={i + '_' + user.props.id} className={i % 2 === 0 ? 'even' : 'odd'}>
                        {user}
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}