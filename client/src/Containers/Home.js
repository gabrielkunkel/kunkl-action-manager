import React, { Component } from 'react'
import {connect} from 'react-redux'

import NewActonForm from '../Components/NewActonForm'

class Home extends Component {

    constructor(props) {
        super(props);

        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    componentDidMount() {
        console.log("from component", this.props);
    }

    handleTaskSubmit(event) {
        event.preventDefault();
        this.props.dispatch({type: 'ADD_ACTON', data: this.props.form});
    }

    handleFormChange(event) {
        let formUpdate = event.target.value;
        this.props.dispatch({type: 'UPDATE_ACTON_ADD_FORM', data: formUpdate });
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <NewActonForm 
                    handleTaskSubmit={this.handleTaskSubmit} 
                    handleFormChange={this.handleFormChange}
                />
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        actons: state.actons,
        form: state.form
    }
})(Home);