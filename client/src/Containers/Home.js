import React, { Component } from 'react'
import {connect} from 'react-redux'
import { generateUUID } from '../Services/uuid.service'
import { DndProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import ActionList from '../Components/ActionList'
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
            parent_actions: [],
            child_actions: [],
            twin_actions: []
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
                
                <DndProvider backend={HTML5Backend}>
                    <ActionList child_actions={this.props.child_actions} />
                </DndProvider>

            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        child_actions: state.child_actions,
        form: state.form
    }
})(Home);