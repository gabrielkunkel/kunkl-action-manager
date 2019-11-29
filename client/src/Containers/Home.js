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
        this.insertUpdateChildActions = this.insertUpdateChildActions.bind(this);
    }

    componentDidMount() {
        console.log("from home component props: ", this.props);
        console.log("from home component state: ", this.state);
    }

    insertUpdateChildActions(childActionToNewPosition, position) {

        let newChildActions = [];
        let i = 0;
        let child_actions_iterator = 0;

        console.log("child action to new position is: ", childActionToNewPosition);
        console.log("new position should be: ", position);

        while (child_actions_iterator < this.props.child_actions.length && i < 10) {
            
            console.log("new child array is now: ", newChildActions);
            console.log("iterator is now: ", i);

            if (position === i ) {
                newChildActions.push(childActionToNewPosition);
                i += 1;
            }
            else if (this.props.child_actions[child_actions_iterator]._id === childActionToNewPosition._id) {
                i += 1;
                child_actions_iterator += 1;
            }
            else {
                newChildActions.push(this.props.child_actions[child_actions_iterator]);
                i += 1;
                child_actions_iterator += 1;
            }
        }

        this.props.dispatch({type: 'REPLACE_CHILD_ACTIONS', data: newChildActions});

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
        this.props.dispatch({type: 'UPDATE_ACTION_ADD_FORM', data: '' });
        event.target.reset();

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
                    <ActionList child_actions={this.props.child_actions} insertUpdateChildActions={this.insertUpdateChildActions}/>
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