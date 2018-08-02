import React from 'react'
import PropTypes from 'prop-types'
import '../styles/item.css';
export default function EditUser(props) {
    const onSubmit = (e) => {
        e.preventDefault();
        props.save();
    }
    return (
        <form onSubmit={onSubmit} class="item">
            <legend>Edit User id:{props.id}</legend>
            <div class="form-group">
                <label for="username">username</label>
                <input type="text" name="username" class="form-control" id="username"
                    value={props.username}
                    onChange={props.onChange}
                />
            </div>
            <div class="form-group">
                <label for="email">email</label>
                <input type="text" name="email" class="form-control" id="email"
                    value={props.email}
                    onChange={props.onChange}
                />
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>

    )
}

EditUser.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string,
    email: PropTypes.string,
    onChange: PropTypes.func,
    save: PropTypes.func,
}
