import React, { Component } from 'react'
import withDragHOC from '../Hooks/withDragHOC'
import config from '../Config'

class Action extends Component {


    componentDidMount() {
        console.log("action component props", this.props)
    };

    render() {
        var {collectedProps, drag, action} = this.props;

        return (
            <div ref={drag} style={{
                opacity: collectedProps.isDragging ? 0 : 1,
                fontSize: 25,
                fontWeight: 'bold',
                cursor: 'move',
                padding: '3px',
                margin: '3px'
              }}> 
                <div>{action.text}</div>
            </div>
        )
    }
}

let specObj = {
    item: { type: config.ItemTypes.CHILD_ACTION }, 
    collect: monitor => ({
        isDragging: !!monitor.isDragging(),
        // add endDrag method for what to do when it is dropped
    }),
}

export default withDragHOC(specObj, Action);
