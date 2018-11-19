import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import { setSessionData } from './actions';
import { Panel } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';
class SessionsOverview extends React.Component {
   
    componentDidMount() {
        this.props.dispatch(fetchResult('sessions', 'getOverview', {}, setSessionData));
    }

    render() {
        
        const { sessionData } = this.props;
      
        return (
                <div>
                    <HeaderPanel title={"Sessions Overview"} />
                    <div className="container-fluid">
                        <Panel>
                            <Panel.Body>
                                    {sessionData && <OverviewTable data={sessionData} />}
                            </Panel.Body>
                        </Panel>
                    </div>
                </div>
        )
    }
} 

export default connect(
    (state) => {
        return {
            sessionData: state.sessionOverviewReducer.sessionData,
        }
    }
)(SessionsOverview);