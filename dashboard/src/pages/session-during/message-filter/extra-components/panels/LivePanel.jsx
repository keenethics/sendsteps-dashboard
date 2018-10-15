import React, { Component } from 'react';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';
import FullScreenButton from '../FullScreenButton';
import PanelMessage from '../PanelMessage';

class LivePanel extends Component {
    render() {

        const { messages } = this.props;

        return (
            <Panel bsStyle="success">
                <Panel.Heading>
                    <h3>
                        <i className="filter-help fa fa-info-circle"></i> Messages live on screen 
                        <FullScreenButton />
                    </h3>
                </Panel.Heading>
                <Panel.Footer>
                    <ButtonToolbar>
                        <Button className="pull-right">
                            <i className="fa fa-trash"></i>
                        </Button>
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

export default LivePanel;