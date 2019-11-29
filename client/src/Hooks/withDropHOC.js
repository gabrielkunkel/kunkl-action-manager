import React from 'react'
import { useDrop } from 'react-dnd';

export default (specObj, Component) => {
    return ({...props}) => {
        const [collectedProps, drop] = useDrop(specObj);

        return <Component collectedProps={collectedProps} drop={drop} {...props}/>
    }
}