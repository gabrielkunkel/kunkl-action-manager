import React, { Component } from 'react'
import {Link} from 'react-router-dom';


export class Nav extends Component {
    render() {

        const { isAuthenticated, login, logout } = this.props.auth;

        return (
            <div>
                <nav>
                <ul>
                    <li>
                        {isAuthenticated() ? <Link to="/home">Home</Link> : <div></div>}
                    </li>
                    <li>
                        {isAuthenticated() ? <Link to="/profile">Profile</Link> : <div></div>}
                    </li>
                    <li>
                        <button onClick={isAuthenticated() ? logout : login}>
                            {isAuthenticated() ? "Log Out" : "Log In"}
                        </button>
                    </li>
                </ul>
                </nav>
            </div>
        )
    }
}
