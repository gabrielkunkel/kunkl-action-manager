import React, { Component } from 'react'

export default class ActiveAction extends Component {
    render() {

        // eslint-disable-next-line 
        var {text, complete} = this.props;

        return (
            <div style={{
                border: '3px',
                width: '80%',
                borderStyle: 'solid',
                borderColor: "yellow",
                marginTop: '10px',
                marginBottom: '10px',
                padding: '5px'
            }}>
                Active: {text}
            </div>
        )
    }
}
