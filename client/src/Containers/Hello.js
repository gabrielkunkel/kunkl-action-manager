import React, { Component } from 'react'

export default class Hello extends Component {

    render() {

        const { login } = this.props.auth;

        return (
            <div>
                <button onClick={login}>
                            Login
                </button>
            </div>
        )
    }
}
