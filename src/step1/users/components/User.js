import React, { Component } from 'react'
import '../styles/item.css'
export default class User extends Component {
    constructor(){
        super()
        console.log('User created!');
    }
    render() {
        return (
            <div className="item">
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
        )
    }
}
