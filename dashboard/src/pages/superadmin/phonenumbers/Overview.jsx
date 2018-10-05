import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import BreadCrumbs from '../../../pages/base/BreadCrumbs';
import { Panel } from 'react-bootstrap';
class PhonenumbersOverview extends React.Component {
   
    componentDidMount() {
        this.props.dispatch(fetchResult('phonenumbers', 'getOverview'));
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
                        <h1>Phonenumber Overview</h1>   
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
)(PhonenumbersOverview);