import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import BreadCrumbs from '../../../pages/base/BreadCrumbs';
import { Panel } from 'react-bootstrap';

class EditDashboardOverview extends React.Component {
   
    componentWillMount() {
        this.props.dispatch(fetchResult('dashboards', 'getOverview'));
        // this.apiRefresh = setInterval(fetchResult, 5000, 'phonenumbers', 'getOverview');
    }

    componentWillUnmount() {
        // clearInterval(this.apiRefresh);//If we use setInterval, we need this method to avoid memory leaks
    }

    shouldRenderTable(data) {
        return Array.isArray(data);
    } 

    render() {
        
        const { data, match } = this.props;
      
        return (
            <div>
                <Panel><Panel.Body>
                    <h1>Edit Dashboard Overview</h1>   
                </Panel.Body></Panel>
                <BreadCrumbs urlList={match.url} />
                <Panel><Panel.Body>
                    <div className="container-fluid">
                        {this.shouldRenderTable(data) ? 
                            <OverviewTable data={data} />
                        : null}
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
)(EditDashboardOverview);