import React from 'react'
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