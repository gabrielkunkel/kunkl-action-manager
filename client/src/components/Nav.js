import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export class Nav extends Component {
    render() {
        return (
            <div>
                <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
                </nav>
            </div>
        )
    }
}
