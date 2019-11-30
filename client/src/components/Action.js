import React, { Component } from 'react'
import withDragHOC from '../Hooks/withDragHOC'
import config from '../Config'
import { DropTarget } from 'react-dnd';

class Action extends Component {


    // componentDidMount() {
    //     console.log("action component props", this.props)
    // };

    render() {
        var {collectedProps, drag, action, connectDropTarget} = this.props;

        return connectDropTarget(
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

function specObjReturned(action) {
        return {
            item: { 
                type: config.ItemTypes.CHILD_ACTION,
                action: action
            }, 
            collect: monitor => ({
                isDragging: !!monitor.isDragging(),
            }),
        }     
}

Action = withDragHOC(specObjReturned, Action);

Action = DropTarget(config.ItemTypes.CHILD_ACTION, {
    drop: (props, monitor) => {
        const item = monitor.getItem();
        props.nestChildAction(item.action, props.action);
    }
}, connect => ({ connectDropTarget: connect.dropTarget() }))(Action);

export default Action;
