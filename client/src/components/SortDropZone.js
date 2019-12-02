import React, { Component } from 'react'
import withDropHOC from '../Hooks/withDropHOC'
import config from '../Config'

import DropBar from './DropBar'

class SortDropZone extends Component {

    render() {

        var {collectedProps, drop} = this.props;

        return (
            <div ref={drop} style={{
                width: '100%',
                height: '10px',
                marginTop: '5px',
                marginBottom: '5px'
              }}>
                {collectedProps.isOver && collectedProps.canDrop && <DropBar />}
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
