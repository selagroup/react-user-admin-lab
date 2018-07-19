import React from 'react';
import PropTypes from 'prop-types';

export default function User(props) {
    return (
        <div 
            className={'user-item ' + (props.selected ? 'selected' : '')}>
            <div>
                id:{props.id}
            </div>
            <div>
                username:{props.username}
            </div>
            <div>
                email:{props.email}
            </div>
        </div>
    );
}

User.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
}