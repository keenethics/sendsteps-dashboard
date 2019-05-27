import React, { Component } from 'react';

import { numWithCommas } from '../../../scripts/intFormatting';
import './Panels.scss'

class LastYearPanel extends Component {

    render() {

        const { contribution, responses, error } = this.props;

        return (
            <div className="card year-card">
                <div className="card-header">
                    <div className="card-title"><h5>Last 365 Days</h5></div>
                </div>
                <div className="card-body text-center">
                    <h2>
                        {(!responses && !error) && <i className="fa fa-circle-o-notch fa-spin"></i>}
                        {(responses && !error) && numWithCommas(responses)}
                        {(!responses && error) && <>N/A</>}
                    </h2>
                </div>
                <div className="card-footer">
                    Your Contribution	
                    <span className="pull-right">
                        {(!contribution && !error) && <i className="fa fa-circle-o-notch fa-spin"></i>}
                        {(contribution && !error) && numWithCommas(contribution)}
                        {(!contribution && error) && <>N/A</>}
                    </span>
                </div>
            </div>
        );
    }
}

export default LastYearPanel;