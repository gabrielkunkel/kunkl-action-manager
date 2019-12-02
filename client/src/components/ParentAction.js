import React, { Component } from 'react'
import config from '../Config'
import { DropTarget } from 'react-dnd'

class ParentAction extends Component {
    render() {

        var {parent, updateActiveAction, connectDropTarget} = this.props;

        return connectDropTarget(
            <div style={{
                width: '80%',
                borderStyle: 'solid',
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
}, connect => ({ connectDropTarget: connect.dropTarget() }))(ParentAction);

export default ParentAction;