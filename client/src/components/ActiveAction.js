import React, { Component } from 'react'

export default class ActiveAction extends Component {
    render() {

        // eslint-disable-next-line 
        var {text} = this.props;

        return (
            <div style={{
                borderStyle: 'solid',
                borderColor: "red",
                marginTop: '10px',
                marginBottom: '10px',
                padding: '3px',
                fontWeight: 'bold',
                fontSize: 25,
                textAlign: 'center',
                cursor: 'default'
            }}>
                {text}
            </div>
        )
    }
}
