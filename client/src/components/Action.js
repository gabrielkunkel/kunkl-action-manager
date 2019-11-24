import React, { Component } from 'react'

export default class Action extends Component {
    render() {

        var {action} = this.props;

        return (
            <div>
                <div>{action.text}</div>
            </div>
        )
    }
}
