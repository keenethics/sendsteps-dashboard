import React, { Component } from 'react';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';
import FullScreenButton from '../FullScreenButton';
import PanelMessage from '../PanelMessage';

class QueuePanel extends Component {
    render() {

        const { messages } = this.props;

        return (
            <Panel bsStyle="info">
                <Panel.Heading>
                    <h3>
                        <i className="filter-help fa fa-info-circle"></i> In Queue 
                        <FullScreenButton />
                    </h3>
                </Panel.Heading>
                <Panel.Footer>
                    <ButtonToolbar>
                        <Button bsStyle="success">Send to Screen</Button>
                        <Button bsStyle="primary">Send to Incoming</Button>
                    </ButtonToolbar>
                </Panel.Footer>
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

export default QueuePanel;