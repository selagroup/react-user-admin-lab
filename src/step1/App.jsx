import React, { Component } from 'react'
import User from './users/components/User'

export default class App extends Component {
    render() {
        let style = {
            width: '600px',
            margin: `10px auto`
        }
        return (
            <div style={style}>
                <h1> User Admin </h1>
                <User />
            </div>
        )
    }
}
