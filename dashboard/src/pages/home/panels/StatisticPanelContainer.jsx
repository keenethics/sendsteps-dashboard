import React, { Component } from 'react';

import LastSessionPanel from "./LastSessionPanel";
import LastWeekPanel from "./LastWeekPanel";
import LastMonthPanel from "./LastMonthPanel";
import LastYearPanel from "./LastYearPanel";
import { post } from '../../../scripts/api';
import { valuesToString } from '../../../scripts/arrayHelper';
import LastSessionResponses from './LastSessionResponses';

class StatisticPanelContainer extends Component {

    state = {
        statistics: null,
        activity: null
    }

    componentDidMount() {
        post(
            'statistics',
            'getHomepage',
            {},
            statistics => this.setState({
                // Convert values to string or else 
                // the && operator will read int(0) results as false
                activity: statistics.activity,
                statistics: valuesToString(statistics),
                error: false
            }),
            error => {
                console.log(error)
                this.setState({
                    error: true,
                    statistics: null
                })
            }
        )
    }

    render() {

        const { statistics, activity, error } = this.state;

        return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-6 col-md-3">
                            <LastSessionPanel 
                                error={error} 
                                responses={statistics && statistics.lastSession} 
                            />
                        </div>
                        <div className="col-xs-6 col-md-3">
                            <LastWeekPanel 
                                error={error} 
                                responses={statistics && statistics.lastWeekResponses}
                                contribution={statistics && statistics.lastWeekUserContribution}
                            />
                        </div>
                        <div className="col-xs-6 col-md-3">
                            <LastMonthPanel 
                                error={error} 
                                responses={statistics && statistics.lastMonthResponses}
                                contribution={statistics && statistics.lastMonthUserContribution}
                            />
                        </div>
                        <div className="col-xs-6 col-md-3">
                            <LastYearPanel 
                                error={error} 
                                responses={statistics && statistics.lastYearResponses}
                                contribution={statistics && statistics.lastYearUserContribution}
                            />
                        </div>
                        {/* <div className="col-xs-9 col-md-6">
                            <LastSessionResponses
                                lastResponses={activity && activity}
                            />
                        </div> */}
                        <div className="col-xs-3 col-md-6 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Top 5 active users</h5>
                                </div>
                                <div className="card-body"></div>
                            </div>
                        </div>
                        <div className="col-xs-3 col-md-6 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Invite a colleague</h5>
                                </div>
                                <div className="card-body"></div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default StatisticPanelContainer;