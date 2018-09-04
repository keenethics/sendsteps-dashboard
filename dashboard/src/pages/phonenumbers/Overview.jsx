import React from 'react';
import TableView from './TableView';
import { connect } from 'react-redux';
import { fetchResult } from '../../actions/api';
import BreadCrumbs from '../../pages/base/BreadCrumbs';

class PhonenumbersOverview extends React.Component {
   
    componentWillMount() {
        this.props.dispatch(fetchResult('phonenumbers', 'getOverview'));
        // this.apiRefresh = setInterval(fetchResult, 5000, 'phonenumbers', 'getOverview');
    }

    componentWillUnmount() {
        // clearInterval(this.apiRefresh);//If we use setInterval, we need this method to avoid memory leaks
    }
    render() {
        return (
                <div>
                    <div className="panel panel-default header-panel">  
                        <div className="panel-body">
                            <h1>Phonenumber Overview</h1>   
                        </div>
                    </div>
                    <BreadCrumbs urlList={this.props.match.url} />
                    <div className="panel panel-default">  
                        <div className="panel-body">
                            <div className="container-fluid">
                                {this.props.data ? 
                                    <TableView data={this.props.data} />
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
)(PhonenumbersOverview);