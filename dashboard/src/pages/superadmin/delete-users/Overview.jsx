import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import BreadCrumbs from '../../../pages/base/BreadCrumbs';
import { PanelBody } from '../../../components/common/Panels';

class DeleteUsersOverview extends React.Component {
   
    componentWillMount() {
        this.props.dispatch(fetchResult('users', 'getDeleteUsersOverview'));
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
        console.log(data);
        return (
            <div>
                <PanelBody>
                    <h1>Delete Users Overview</h1>   
                </PanelBody>
                <BreadCrumbs urlList={match.url} />
                <PanelBody>
                    <div className="container-fluid">
                        {this.shouldRenderTable(data) ? 
                            <OverviewTable data={data} />
                        : null}
                    </div>
                </PanelBody>
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
)(DeleteUsersOverview);