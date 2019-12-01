import React, { Component } from 'react'

export default class ParentAction extends Component {
    render() {

        var {parent, updateActiveAction} = this.props;

        return (
            <div>
                <div onDoubleClick={() => updateActiveAction(parent._id)}>{parent.text}</div>
            </div>
        )
    }
}
