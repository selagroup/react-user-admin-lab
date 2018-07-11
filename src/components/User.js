import React from 'react';
import PropTypes from 'prop-types';
export default class User extends React.Component {
    constructor() {
        super();
        console.log('User created!');
    }
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

User.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
}