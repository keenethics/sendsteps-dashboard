import React, { Component } from 'react';

import { numWithCommas } from '../../../scripts/intFormatting';
import './Panels.scss'

class LastSessionPanel extends Component {
        
    render() {
        const { responses, error } = this.props;

        return (
            <div className="card last-session-card">
                <div className="card-header">
                    <div className="card-title"><h5>Your last Session</h5></div>
                </div>
                <div className="card-body text-center">
                    <h2>
                        {!responses && <i className="fa fa-circle-o-notch fa-spin"></i>}
                        {responses && numWithCommas(responses)}
                    </h2>
                </div>
                <div className="card-footer" style={{height: '40px'}}>
                </div>
            </div>
        );
    }
}

export default LastSessionPanel;