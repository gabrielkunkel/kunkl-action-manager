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

    insertUpdateChildActions(childActionToNewPosition, newPosition) {

        // index of
        let oldPosition = this.props.child_actions.indexOf(childActionToNewPosition);
        console.log("old position: ", oldPosition);
        console.log("new position: ", newPosition);

        if (oldPosition < newPosition) {
            newPosition -= 1;
        }

        // slice left around index
        let leftArr = this.props.child_actions.slice(0, oldPosition);
        console.log("left slice: ", leftArr);

        // slice right around index
        let rightArr = this.props.child_actions.slice(oldPosition + 1, this.props.child_actions.length);
        console.log("right slice: ", leftArr);

        // concatenate left and right
        let newArray = [].concat(leftArr, rightArr);
        console.log("complete array: ", newArray);

        // splice to insert
        newArray.splice(newPosition, 0, childActionToNewPosition);

        this.props.dispatch({type: 'REPLACE_CHILD_ACTIONS', data: newArray});

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