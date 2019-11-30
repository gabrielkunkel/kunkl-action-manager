import React, { Component } from 'react'
import {connect} from 'react-redux'
import { generateUUID } from '../Services/uuid.service'
import { DndProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import ActionList from '../Components/ActionList'
import NewActionForm from '../Components/NewActionForm'
import dbService from '../Services/db.service'

class Home extends Component {

    constructor(props) {
        super(props);

        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.insertUpdateChildActions = this.insertUpdateChildActions.bind(this);
        this.nestChildAction = this.nestChildAction.bind(this);
    }

    componentDidMount() {

        this.props.auth.auth0.client.userInfo(this.props.auth.getAccessToken(), (err, profile) => {
            dbService
            .getMasterAction(profile.sub)
            .then((response) => {
                let theData = response.data;
                let newState = {
                    parent_actions: theData.parent_actions,
                    text: "Master",
                    _id: theData._id,
                    user: theData.user,
                    twin_actions: theData.twin_actions,
                    child_actions: theData.child_actions,
                }

                this.props.dispatch({ type: 'CHANGE_ACTIVE_ACTION', data: newState });
            })
        });

      }


    insertUpdateChildActions(childActionToNewPosition, newPosition) {

        let oldPosition = this.props.child_actions.indexOf(childActionToNewPosition);

        if (oldPosition < newPosition) {
            newPosition -= 1;
        }

        let leftArr = this.props.child_actions.slice(0, oldPosition);
        let rightArr = this.props.child_actions.slice(oldPosition + 1, this.props.child_actions.length);
        let newArray = [].concat(leftArr, rightArr);
        newArray.splice(newPosition, 0, childActionToNewPosition);

        this.props.dispatch({type: 'REPLACE_CHILD_ACTIONS', data: newArray});

    }

    nestChildAction(actionToNest, newParentAction) {

        // update the newParentAction
        let position = this.props.child_actions.indexOf(newParentAction);
        let newArray = [...this.props.child_actions];
        newArray[position].child_actions.push(actionToNest._id);

        // todo: add async call to update that actions child_actions on db
        // insert update newParentAction post here

        // update the primary list to no longer have that action
        newArray = newArray.filter(item => {
            return item._id !== actionToNest._id;
        });

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
                    <ActionList 
                        child_actions={this.props.child_actions} 
                        insertUpdateChildActions={this.insertUpdateChildActions}
                        nestChildAction={this.nestChildAction}
                    />
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