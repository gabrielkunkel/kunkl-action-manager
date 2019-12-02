import React, { Component } from 'react'
import withDragHOC from '../Hooks/withDragHOC'
import config from '../Config'
import { DropTarget } from 'react-dnd';
import Checkbox from '@material-ui/core/Checkbox';

class Action extends Component {

    

    render() {
        var {collectedProps, isOver, canDrop, drag, action, connectDropTarget, updateActiveAction, toggleActionCompletion} = this.props;

        console.log(this.props);

        return connectDropTarget(
            <div ref={drag} onDoubleClick={() => updateActiveAction(action._id)} style={{
                opacity: collectedProps.isDragging ? 0 : 1,
                fontSize: 25,
                fontWeight: 'bold',
                padding: '3px',
                margin: '0px',
                width: '80%',
                borderStyle: isOver && canDrop ? 'dotted' : 'solid',
                borderColor: "green",
                cursor: 'grab'
              }}> 
                <div><Checkbox
                    defaultChecked={action.complete}
                    color="primary"
                    onChange={(event) => {
                        return toggleActionCompletion(action, event) 
                    }}
                    inputProps={{
                        'aria-label': 'primary checkbox',
                    }}
                />{action.text}</div>
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
}, (connect, monitor) => ({ 
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(Action);

export default Action;
