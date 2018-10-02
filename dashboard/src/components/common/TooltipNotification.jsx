import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class TooltipNotification extends Component {

    render() {

        const { title, content, placement } = this.props;

        return (
                <OverlayTrigger 
                        overlay={<Tooltip id={title}>{content}</Tooltip>}
                        delay={150}
                        placement={placement || "right"} 
                    >
                    <i className="fa fa-question-circle"></i>
                </OverlayTrigger>
        )
    }
}

export default TooltipNotification;