import React, { Component } from 'react'
import DndDuo from "./DndDuo";
import SortDropZone from "./SortDropZone";

export default class ActionList extends Component {

    render() {

        var {child_actions, insertUpdateChildActions, nestChildAction, updateActiveAction, toggleActionCompletion} = this.props;

        return (
            <div>
                <SortDropZone position={0} key="anotherkey" insertUpdateChildActions={insertUpdateChildActions} />
                {child_actions.length === 0 ? <div><i>Add child actions below...</i></div> : child_actions.map((action, index) => <DndDuo 
                                                        key={action._id}
                                                        action={action} 
                                                        position={index+1} 
                                                        insertUpdateChildActions={insertUpdateChildActions} 
                                                        nestChildAction={nestChildAction}
                                                        updateActiveAction={updateActiveAction}
                                                        toggleActionCompletion={toggleActionCompletion}
                                                        />)}
            </div>
        )
    }
}
