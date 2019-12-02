import React, { Component } from 'react'
import { ArrowRight } from '@material-ui/icons';

export default class DropBar extends Component {
    render() {
        return (
            <div style={{
                // backgroundColor: '#808080',
                // width: '100%',
                // height: '4px'
              }}>
                <ArrowRight fontSize="large" />
            </div>
        )
    }
}
