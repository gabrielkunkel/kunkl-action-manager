import React, { Component } from 'react'
import {connect} from 'react-redux'
import Action from '../Components/Action'
import { generateUUID } from '../Services/uuid.service'

import NewActionForm from '../Components/NewActionForm'

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

        let action = {
            _id: generateUUID(),
            user: "test_id", // this.props.auth.userProfile.sub,
            text: this.props.form,
            complete: false,
            parents: [],
            children: [],
            twins: []
        };

        this.props.dispatch({type: 'ADD_ACTION', data: action });
    }

    handleFormChange(event) {
        this.props.dispatch({type: 'UPDATE_ACTION_ADD_FORM', data: event.target.value });
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <NewActionForm 
                    handleTaskSubmit={this.handleTaskSubmit} 
                    handleFormChange={this.handleFormChange}
                />
                <br />
                {this.props.actions.map(action => <Action key={action._id} action={action} />)}

            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        actions: state.actions,
        form: state.form
    }
})(Home);