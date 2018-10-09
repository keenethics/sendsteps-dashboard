import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import BreadCrumbs from '../../../pages/base/BreadCrumbs';
import { Panel } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';
class SessionsOverview extends React.Component {
   
    componentDidMount() {
        this.props.dispatch(fetchResult('sessions', 'getOverview'));
        // this.apiRefresh = setInterval(fetchResult, 5000, 'phonenumbers', 'getOverview');
    }

    componentWillUnmount() {
        // clearInterval(this.apiRefresh);//If we use setInterval, we need this method to avoid memory leaks
    }

    render() {
        
        const { data, match } = this.props;
      
        return (
                <div>
                    <HeaderPanel
                        title={"Sessions Overview"}
                    />
                    <Panel>
                        <Panel.Body>
                            <div className="container-fluid">
                                {data && <OverviewTable data={data} />}
                            </div>
                        </Panel.Body>
                    </Panel>
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