import React, { Component } from 'react'
import {connect} from 'react-redux'

import NewActonForm from '../Components/NewActonForm'

class Home extends Component {

    componentDidMount() {
        console.log("from component", this.props);
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <NewActonForm />
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        actons: state.actons
    }
})(Home);