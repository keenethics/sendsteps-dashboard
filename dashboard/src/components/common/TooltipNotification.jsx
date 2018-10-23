import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class TooltipNotification extends Component {

    render() {

        const { title, tooltip, placement, children, delay } = this.props;

        return (
                <OverlayTrigger 
                    overlay={<Tooltip id={title}>{tooltip}</Tooltip>}
                    delay={delay || 150}
                    placement={placement || "right"} >
                    <span>
                        {children}
                    </span>
                </OverlayTrigger>
        )
    }
}

export default TooltipNotification;