import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { setSessionData } from './actions';
import { Panel } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';
import { get } from '../../../scripts/api';
class SessionsOverview extends React.Component {
   
    componentDidMount() {
        get('sessions', 'getOverview', 
            {},
            result => {
                console.log(result);
                this.props.dispatch(setSessionData(result.content));
            }
        )
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