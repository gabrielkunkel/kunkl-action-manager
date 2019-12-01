import React, { Component } from 'react'
import Action from './Action'
import SortDropZone from "./SortDropZone";

export default class DndDuo extends Component {
    render() {

        var {action, position, insertUpdateChildActions, nestChildAction, updateActiveAction} = this.props

        return (
            <div>
                <Action action={action} nestChildAction={nestChildAction} updateActiveAction={updateActiveAction} />
                <SortDropZone position={position} insertUpdateChildActions={insertUpdateChildActions} />
            </div>
        )
    }
}
