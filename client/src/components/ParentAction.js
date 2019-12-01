import React, { Component } from 'react'

export default class ParentAction extends Component {
    render() {

        var {parent, updateActiveAction} = this.props;

        return (
            <div style={{
                border: '3px',
                width: '80%',
                borderStyle: 'solid',
                borderColor: "blue",
                marginTop: '10px',
                marginBottom: '10px',
                padding: '5px'
            }}>
                <div onDoubleClick={() => updateActiveAction(parent._id)}>{parent.text}</div>
            </div>
        )
    }
}
