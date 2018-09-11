import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult } from '../../actions/api';
import BreadCrumbs from '../../pages/base/BreadCrumbs';

class SessionsOverview extends React.Component {
   
    componentWillMount() {
        this.props.dispatch(fetchResult('presentations', 'getOverview'));
        // this.apiRefresh = setInterval(fetchResult, 5000, 'phonenumbers', 'getOverview');
    }

    componentWillUnmount() {
        // clearInterval(this.apiRefresh);//If we use setInterval, we need this method to avoid memory leaks
    }

    shouldRenderTable(data) {
        return Array.isArray(data);
    } 

    render() {
        
        const { data, isLoading, match } = this.props;
      
        return (
                <div>
                    <div className="panel panel-default header-panel">  
                        <div className="panel-body">
                            <h1>123 Overview</h1>   
                        </div>
                    </div>
                    <BreadCrumbs urlList={match.url} />
                    <div className="panel panel-default">  
                        <div className="panel-body">
                            <div className="container-fluid">
                                {/* {this.shouldRenderTable(data) ? 
                                    // <OverviewTable data={data} />
                                : null} */}
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
)(SessionsOverview);