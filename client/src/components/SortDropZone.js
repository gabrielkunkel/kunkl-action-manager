import React, { Component } from 'react'
import withDropHOC from '../Hooks/withDropHOC'

class SortDropZone extends Component {

    componentDidMount() {
        console.log("SortDropZone", this.props)
    }

    render() {

        var {collectedProps, drop, position} = this.props;

        return (
            <div ref={drop} style={{
                backgroundColor: '#808080',
                width: '90%',
                height: '1px',
              }}>
                
            </div>
        )
    }
}

export default SortDropZone;
