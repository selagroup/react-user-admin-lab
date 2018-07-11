import React from 'react';
import PropTypes from 'prop-types';
export default class EditUser extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            id: prop.id,
            username: prop.username,
            email: prop.email,
        }
    
    }
    save = () => {
        this.setState({
            username: 'New User Name'
        })
    }
    render() {
        return (
            <div className="user-item">
                <div>
                    id:{this.state.id}
                </div>
                <div>
                    username:{this.state.username}
                </div>
                <div>
                    email:{this.state.email}
                </div>
                <button className={'btn btn-primary'} onClick={this.save}>Save</button>
            </div>
        );
    }
}

EditUser.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
}