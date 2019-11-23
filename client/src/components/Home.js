import React, { Component } from '../../node_modules/react'
import {connect} from 'react-redux'

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>
        )
    }
}

export default connect((state, props) => {
    return {}
})(Home);