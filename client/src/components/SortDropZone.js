import React, { Component } from 'react'
import withDropHOC from '../Hooks/withDropHOC'
import config from '../Config'

class SortDropZone extends Component {

    // componentDidMount() {
    //     console.log("SortDropZone", this.props)
    // }

    render() {

        var {collectedProps, drop, position, insertUpdateChildActions} = this.props;

        return (
            <div ref={drop} style={{
                backgroundColor: '#808080',
                width: '90%',
                height: '5px',
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
        }
    }
}

export default withDropHOC(specObjReturned, SortDropZone);
