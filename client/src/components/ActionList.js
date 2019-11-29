import React, { Component } from 'react'
import DndDuo from "./DndDuo";
import SortDropZone from "./SortDropZone";

export default class ActionList extends Component {

    render() {

        var {child_actions} = this.props;

        return (
            <div>
                <SortDropZone position={0} />
                {child_actions.map((action, index) => <DndDuo key={action._id} action={action} position={index+1} />)}
            </div>
        )
    }
}
