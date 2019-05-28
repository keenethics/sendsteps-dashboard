import React, { Component } from 'react';
import Toggle from 'react-bootstrap-toggle';
import './Switch.scss';

class Switch extends Component {
    render() {
        // onClick, on, off, style, disabled
        return (
            <Toggle
                on={<span style={{width: '50%'}}>{this.props.on}</span>}
                off={<span style={{width: '50%'}}>{this.props.off}</span>}
                offstyle={"secondary lh-20"}
                onstyle={"success lh-20"}
                { ...this.props }
                // style={this.props.style || {width: '80px'}}
            />
        );
    }
}

export default Switch;