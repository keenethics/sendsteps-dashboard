import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult, clearData } from '../../../actions/api';
import BreadCrumbs from '../../../pages/base/BreadCrumbs';
import { Panel } from 'react-bootstrap';

class SurveysOverview extends React.Component {
   
    componentDidMount() {
        this.props.dispatch(fetchResult('surveys', 'getOverview'));
        // this.apiRefresh = setInterval(fetchResult, 5000, 'phonenumbers', 'getOverview');
    }

    componentWillUnmount() {
        this.props.dispatch(clearData());
    }

    render() {
        
        const { data, match } = this.props;

        return (
            <div>
                <Panel><Panel.Body>
                    <h1>Surveys Overview</h1>   
                </Panel.Body></Panel>
                <BreadCrumbs urlList={match.url} />
                <Panel><Panel.Body>
                    <div className="container-fluid">
                        {data && <OverviewTable data={data} />}
                    </div>
                </Panel.Body></Panel>
            </div>
        )
    }
} 

export default connect(
    (state) => {
        return {
            data: state.apiReducer.data,
        }
    }
)(SurveysOverview);