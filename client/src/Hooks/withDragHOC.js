import React from 'react'
import { useDrag } from 'react-dnd';

export default (specObjFunc, Component) => {


    return (props) => {

        const [collectedProps, drag] = useDrag(specObjFunc(props.action));

        return <Component collectedProps={collectedProps} drag={drag} {...props}/>
    }
}
