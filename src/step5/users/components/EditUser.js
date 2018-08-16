import React from 'react'
import PropTypes from 'prop-types'
import Logger from '../../hoc/Logger';
import '../styles/item.css';
class EditUser extends React.Component {

    constructor(props) {
        super(props);

        this.nameInput = React.createRef();
    }

    componentDidMount() {
        this.nameInput.current.focus();
    }

    componentDidUpdate(prevProps) {

        if (prevProps.id !== this.props.id)
            this.nameInput.current.focus();
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.save();
    }
    render() {
        return (
            <form onSubmit={this.onSubmit} className="item">
                <legend>Edit User id:{this.props.id}</legend>
                <div className="form-group">
                    <label htmlFor="username">username</label>
                    <input ref={this.nameInput} type="text" name="username" className="form-control" id="username"
                        value={this.props.username}
                        onChange={this.props.onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" className="form-control" id="email"
                        value={this.props.email}
                        onChange={this.props.onChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>

        )
    }
}
export default Logger(EditUser,'edit user');


EditUser.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string,
    email: PropTypes.string,
    onChange: PropTypes.func,
    save: PropTypes.func,
}
