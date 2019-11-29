import React from 'react'
import { useDrop } from 'react-dnd';

export default (specObjFunc, Component) => {
    return (props) => {
        const [collectedProps, drop] = useDrop(specObjFunc(props.insertUpdateChildActions, props.position));

        return <Component collectedProps={collectedProps} drop={drop} {...props}/>
    }
}