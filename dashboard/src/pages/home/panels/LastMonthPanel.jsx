import React, { Component } from 'react';

import { numWithCommas } from '../../../scripts/intFormatting';
import './Panels.scss'

class LastMonthPanel extends Component {

    render() {

        const { contribution, responses, error } = this.props;

        return (
            <div className="card month-card">
                <div className="card-header">
                    <div className="card-title"><h5>Last 30 Days</h5></div>
                </div>
                <div className="card-body text-center">
                    <h2>
                        {!responses && <i className="fa fa-circle-o-notch fa-spin"></i>}
                        {responses && numWithCommas(responses)}
                    </h2>
                </div>
                <div className="card-footer">
                    Your Contribution	
                    <span className="pull-right">
                        {!contribution && <i className="fa fa-circle-o-notch fa-spin"></i>}
                        {contribution && numWithCommas(contribution)}
                    </span>
                </div>
            </div>
        );
    }
}

export default LastMonthPanel;