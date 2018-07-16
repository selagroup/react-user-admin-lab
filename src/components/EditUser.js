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
    update = (event) => {
        let change = {};
        change[event.target.name] = event.target.value
        this.setState({
            ...change
        });
    }
    save = () => {
        this.props.save({
            id: this.props.id,
            username: this.state.username,
            email: this.state.email,
        })
    }
    render() {
        return (
            <div className="user-item">
                <div>
                    id:{this.state.id}
                </div>
                <div>
                    username: <input value={this.state.username} className='form-control' name='username' onChange={this.update} />
                </div>
                <div>
                    email: <input value={this.state.email} className='form-control' name='email' onChange={this.update} />
                </div>
                <button className={'btn btn-primary'} onClick={this.save}>Save</button>
            </div>
        );
    }
}

EditUser.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    save: PropTypes.func.isRequired,
}