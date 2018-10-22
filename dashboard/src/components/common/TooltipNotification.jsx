import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class TooltipNotification extends Component {

    render() {

        const { title, tooltip, placement, children } = this.props;

        return (
                <OverlayTrigger 
                    overlay={<Tooltip id={title}>{tooltip}</Tooltip>}
                    delay={150}
                    placement={placement || "right"} 
                >
                    {children}
                </OverlayTrigger>
        )
    }
}

export default TooltipNotification;