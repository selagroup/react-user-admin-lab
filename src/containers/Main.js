import { connect } from 'react-redux'
import { addUser, removeUser, updateUser } from '../actions';
import App from '../App';

const mapStateToProps = state => ({
    users: state.users
})

const mapDispatchToProps = dispatch => ({
    addUser: (user) => dispatch(addUser(user)),
    removeUser: (id) => dispatch(removeUser(id)),
    updateUser: (user) => dispatch(updateUser(user)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)