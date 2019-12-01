import React, { Component } from 'react'
import {connect} from 'react-redux'
import { generateUUID } from '../Services/uuid.service'
import { DndProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import dbService from '../Services/db.service'

import ActionList from '../Components/ActionList'
import NewActionForm from '../Components/NewActionForm'
import ActiveAction from '../Components/ActiveAction'
import ParentList from '../Components/ParentList'

class Home extends Component {

    constructor(props) {
        super(props);

        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.insertUpdateChildActions = this.insertUpdateChildActions.bind(this);
        this.nestChildAction = this.nestChildAction.bind(this);
        this.updateActiveAction = this.updateActiveAction.bind(this);
        this.nestChildUpParentList = this.nestChildUpParentList.bind(this);
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

    updateActiveAction(actionId) {
        dbService
            .getAction(actionId)
            .then(response => {
                console.log("response should be made: ", response.data);

                let theData = response.data;
                let newState = {
                    parent_actions: theData.parent_actions,
                    text: theData.text,
                    _id: theData._id,
                    user: theData.user,
                    twin_actions: theData.twin_actions,
                    child_actions: theData.child_actions,
                }

                this.props.dispatch({ type: 'CHANGE_ACTIVE_ACTION', data: newState });

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

        dbService
            .insertUpdateChildActions(this.props._id, newArray)
            .then(response => {
                this.props.dispatch({type: 'REPLACE_CHILD_ACTIONS', data: response.data.child_actions });
            });
    }

    nestChildAction(actionToNest, newParentAction) {

        if(actionToNest._id !== newParentAction._id) {

        let position = this.props.child_actions.indexOf(newParentAction);
        let newArray = [...this.props.child_actions];
        newArray[position].child_actions.push(actionToNest._id);

        dbService.nestChildAction(actionToNest._id, newParentAction._id, this.props._id)
            .then(response => {
                if(response.data.db_success) {
                    newArray = newArray.filter(item => {
                        return item._id !== actionToNest._id;
                    });
            
                    this.props.dispatch({type: 'REPLACE_CHILD_ACTIONS', data: newArray });
                }
            });
        }
    
    }

    nestChildUpParentList(actionToNest, newParentAction) {

        dbService.nestChildUpParentList(actionToNest._id, newParentAction._id, this.props._id)
            .then(response => {
                if(response.data.db_success) {
                    let newArray = this.props.child_actions.filter(item => {
                        return item._id !== actionToNest._id;
                    });
                    
                    this.props.dispatch({type: 'REPLACE_CHILD_ACTIONS', data: newArray });
                }
            });    
    }

    handleTaskSubmit(event) {
        event.preventDefault();

        let parentActionsIds = this.props.parent_actions.map(item => {
            return item._id;
        });

        let action = {
            _id: generateUUID(),
            user: this.props.user,
            text: this.props.form,
            complete: false,
            parent_actions: [...parentActionsIds, this.props._id],
            child_actions: [],
            twin_actions: []
        };

        dbService
            .addAction(action)
            .then((response) => {
                this.props.dispatch({type: 'ADD_ACTION', data: response.data });
                this.props.dispatch({type: 'UPDATE_ACTION_ADD_FORM', data: '' });
            });

        
    }

    handleFormChange(event) {
        this.props.dispatch({type: 'UPDATE_ACTION_ADD_FORM', data: event.target.value });
    }

    render() {
        return (
            <div>
                
                <DndProvider backend={HTML5Backend}>

                    {this.props.parent_actions ? <ParentList 
                        parent_actions={this.props.parent_actions} 
                        updateActiveAction={this.updateActiveAction}
                        nestChildUpParentList={this.nestChildUpParentList}
                        /> : <div></div>}

                    <br />

                    <ActiveAction text={this.props.text} complete={this.props.complete} />

                    <ActionList 
                        child_actions={this.props.child_actions} 
                        insertUpdateChildActions={this.insertUpdateChildActions}
                        nestChildAction={this.nestChildAction}
                        updateActiveAction={this.updateActiveAction}
                    />
                </DndProvider>

                <NewActionForm 
                    handleTaskSubmit={this.handleTaskSubmit} 
                    handleFormChange={this.handleFormChange}
                    formValue={this.props.form}
                />

            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        child_actions: state.child_actions,
        form: state.form,
        user: state.user,
        _id: state._id,
        text: state.text,
        complete: state.complete,
        parent_actions: state.parent_actions
    }
})(Home);