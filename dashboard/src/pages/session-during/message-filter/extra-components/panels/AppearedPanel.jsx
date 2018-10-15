import React, { Component } from 'react';
import { Panel, } from 'react-bootstrap';
import FullScreenButton from '../FullScreenButton';
import PanelMessage from '../PanelMessage';

class AppearedPanel extends Component {
    render() {

        const { messages } = this.props;

        return (
            <Panel>
                <Panel.Heading>
                    <h3>
                        <i className="filter-help fa fa-info-circle"></i> Appeared on screen 
                        <FullScreenButton />
                    </h3>
                </Panel.Heading>
                <Panel.Body>
                    <ul className="list-group">
                        {messages && messages.map((message, index) => {
                            return <PanelMessage key={index} count={index + 1} message={message} />
                        })}
                    </ul>
                </Panel.Body>
            </Panel>
        );
    }
}

export default AppearedPanel;