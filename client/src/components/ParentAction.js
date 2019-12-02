import React, { Component } from 'react'
import config from '../Config'
import { DropTarget } from 'react-dnd'

class ParentAction extends Component {
    render() {

        var {parent, isOver, canDrop, updateActiveAction, connectDropTarget} = this.props;

        return connectDropTarget(
            <div style={{
                width: '80%',
                borderStyle: isOver && canDrop ? 'dotted' : 'solid',
                borderColor: "blue",
                padding: '3px',
                margin: '3px',
                fontSize: 25,
                fontWeight: 'bold',
                textAlign: 'center', 
                cursor: 'default'
            }}>
                <div onDoubleClick={() => updateActiveAction(parent._id)}>{parent.text}</div>
            </div>
        )
    }
}

ParentAction = DropTarget(config.ItemTypes.CHILD_ACTION, {
    drop: (props, monitor) => {
        const item = monitor.getItem();
        props.nestChildUpParentList(item.action, props.parent);
    }
}, (connect, monitor) => ({ 
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()}))(ParentAction);

export default ParentAction;