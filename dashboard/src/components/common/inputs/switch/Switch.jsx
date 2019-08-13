import React, { Component } from 'react';
import Toggle from 'react-bootstrap-toggle';
import './Switch.scss';

class Switch extends Component {
    render() {
        // onClick, on, off, style, disabled
        const { onstyle, offstyle, on, off, style } = this.props

        return (
            <Toggle
                on={<span style={{width: '50%'}}>{on}</span>}
                off={<span style={{width: '50%'}}>{off}</span>}
                { ...this.props }
                offstyle={"secondary lh-adjust " + offstyle}
                onstyle={"success lh-adjust " + onstyle}
                size={"sm"}
                style={{minWidth: '75px', textAlign: 'center', ...style}}
            />
        );
    }
}

export default Switch;