import React, { Component } from 'react'
import Action from './Action'
import SortDropZone from "./SortDropZone";

export default class DndDuo extends Component {
    render() {

        var {action, position, insertUpdateChildActions, nestChildAction} = this.props

        return (
            <div>
                <Action action={action} nestChildAction={nestChildAction} />
                <SortDropZone position={position} insertUpdateChildActions={insertUpdateChildActions} />
            </div>
        )
    }
}
