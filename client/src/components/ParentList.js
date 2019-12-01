import React, { Component } from 'react'
import ParentAction from './ParentAction'

export default class ParentList extends Component {
    render() {

        var {parent_actions, updateActiveAction, nestChildUpParentList} = this.props;

        return (
            <div>
                {parent_actions.map(parent => <ParentAction 
                    key={parent._id} 
                    parent={parent} 
                    updateActiveAction={updateActiveAction} 
                    nestChildUpParentList={nestChildUpParentList}
                    />)}
            </div>
        )
    }
}
