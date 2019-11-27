import React, { Component } from 'react'
import Action from './Action'

export default class ActionList extends Component {

    render() {

        var {child_actions} = this.props;

        return (
            <div>
                {child_actions.map(action => <Action key={action._id} action={action} />)}
            </div>
        )
    }
}
