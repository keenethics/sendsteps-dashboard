import React, { Component } from 'react';
import { Panel } from 'react-bootstrap'
import { numWithCommas } from '../../../scripts/intFormatting';
import './Panels.scss'

class LastWeekPanel extends Component {
        
    render() {

        const { contribution, responses, error } = this.props;

        return (
            <Panel className="week-panel panel-no-border">
                <Panel.Heading>
                    <Panel.Title><h5>Last 7 Days</h5></Panel.Title>
                </Panel.Heading>
                <Panel.Body className="text-center">
                    <h2>
                        {!responses && <i className="fa fa-circle-o-notch fa-spin"></i>}
                        {responses && numWithCommas(responses)}
                    </h2>
                </Panel.Body>
                <Panel.Footer>
                    Your Contribution	
                    <span className="pull-right">
                        {!contribution && <i className="fa fa-circle-o-notch fa-spin"></i>}
                        {contribution && numWithCommas(contribution)}
                    </span>
                </Panel.Footer>
            </Panel>
        );
    }
}

export default LastWeekPanel;