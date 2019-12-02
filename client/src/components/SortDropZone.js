import React, { Component } from 'react'
import withDropHOC from '../Hooks/withDropHOC'
import config from '../Config'

class SortDropZone extends Component {

    render() {

        var {collectedProps, drop} = this.props;

        return (
            <div ref={drop} style={{
                height: '11px',
                borderStyle: collectedProps.isOver && collectedProps.canDrop ? 'solid' : 'none',
                borderColor: 'yellow'
              }}>
            </div>
        )
    }
}

function specObjReturned(insertUpdateChildActions, position) {
    return {
        accept: config.ItemTypes.CHILD_ACTION,
        drop: (item) => { 
            insertUpdateChildActions(item.action, position) 
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
          })
    }
}

export default withDropHOC(specObjReturned, SortDropZone);
