import React, { Component } from 'react'

export default class ParentAction extends Component {
    render() {

        var {parent, updateActiveAction} = this.props;

        return (
            <div style={{
                width: '80%',
                borderStyle: 'solid',
                borderColor: "blue",
                padding: '3px',
                margin: '3px',
                fontSize: 25,
                fontWeight: 'bold'

            }}>
                <div onDoubleClick={() => updateActiveAction(parent._id)}>{parent.text}</div>
            </div>
        )
    }
}
