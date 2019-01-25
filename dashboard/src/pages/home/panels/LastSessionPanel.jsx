import React, { Component } from 'react';
import { Panel } from 'react-bootstrap'
import { post } from '../../../scripts/api';
import './Panels.scss'

class LastSessionPanel extends Component {
    
    state = {
        responses: null,
        contribution: null
    }

    componentDidMount() {
        post(
            'home',
            'getLastSessionData',
            {},
            res => this.setState({
                responses: res.responses,
                contribution: res.contribution
            }),
            () => this.setState({
                responses: "N/A",
                contribution: "N/A"
            })
        )
    }
    
    render() {

        const { contribution, responses } = this.state;

        return (
            <Panel className="last-session-panel panel-no-border">
                <Panel.Heading>
                    <Panel.Title><h5>Your last Session</h5></Panel.Title>
                </Panel.Heading>
                <Panel.Body className="text-center">
                    {!responses && <i className="fa fa-circle-o-notch fa-lg fa-spin"></i>}
                    {responses && responses}
                </Panel.Body>
                <Panel.Footer>
                    Your Contribution	
                    <span className="pull-right">
                        {!contribution && <i className="fa fa-circle-o-notch fa-lg fa-spin"></i>}
                        {contribution && contribution}
                    </span>
                </Panel.Footer>
            </Panel>
        );
    }
}

export default LastSessionPanel;