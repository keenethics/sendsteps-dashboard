import React, { Component } from 'react';
import { Panel } from 'react-bootstrap'
import { numWithCommas } from '../../../scripts/intFormatting';
import './Panels.scss'

class LastSessionPanel extends Component {
        
    render() {
        const { responses, error } = this.props;

        return (
            <Panel className="last-session-panel panel-no-border">
                <Panel.Heading>
                    <Panel.Title><h5>Your last Session</h5></Panel.Title>
                </Panel.Heading>
                <Panel.Body className="text-center">
                    <h2>
                        {!responses && <i className="fa fa-circle-o-notch fa-spin"></i>}
                        {responses && numWithCommas(responses)}
                    </h2>
                </Panel.Body>
                <Panel.Footer style={{height: '40px'}}>
                </Panel.Footer>
            </Panel>
        );
    }
}

export default LastSessionPanel;