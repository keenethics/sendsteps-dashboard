import React, { Component } from 'react';
import Toggle from 'react-bootstrap-toggle';
import './DefaultToggle.scss';

class DefaultToggle extends Component {
    render() {
        // onClick, on, off, style, disabled
        return (
            <Toggle
                { ...this.props }
                on={<span style={{width: '50%'}}>{this.props.on}</span>}
                off={<span style={{width: '50%'}}>{this.props.off}</span>}
                offstyle={"secondary w-50 lh-20"}
                onstyle={"success w-50 lh-20"}
                // style={this.props.style || {width: '80px'}}
            />
        );
    }
}

export default DefaultToggle;