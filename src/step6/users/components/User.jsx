import React from 'react'
import PropTypes from 'prop-types';
import '../styles/item.css'
import ApplyTheme from '../../hoc/ApplyTheme';
function User(props) {
    return (
        <div className="item">
            <div>
                id: {props.id}
            </div>
            <div>
                username: {props.username}
            </div>
            <div>
                email: {props.email}
            </div>
        </div>
    )
}
User.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
}
export default ApplyTheme(User);