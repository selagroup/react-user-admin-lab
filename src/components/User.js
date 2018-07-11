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
                    id:{this.props.id}
                </div>
                <div>
                    username:{this.props.username}
                </div>
                <div>
                    email:{this.props.email}
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