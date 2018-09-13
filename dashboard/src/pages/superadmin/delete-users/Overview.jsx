import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import BreadCrumbs from '../../../pages/base/BreadCrumbs';

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
                    <div className="panel panel-default header-panel">  
                        <div className="panel-body">
                            <h1>Phonenumber Overview</h1>   
                        </div>
                    </div>
                    <BreadCrumbs urlList={match.url} />
                    <div className="panel panel-default">  
                        <div className="panel-body">
                            <div className="container-fluid">
                                {this.shouldRenderTable(data) ? 
                                    <OverviewTable data={data} />
                                : null}
                            </div>
                        </div>
                    </div>
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