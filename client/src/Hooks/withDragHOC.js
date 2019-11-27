import React from 'react'
import { useDrag } from 'react-dnd';

export default (specObj, Component) => {
    return ({...props}) => {
        const [collectedProps, drag] = useDrag(specObj);

        return <Component collectedProps={collectedProps} drag={drag} {...props}/>
    }
}
