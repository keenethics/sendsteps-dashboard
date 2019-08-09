import * as React from 'react'; 
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { setSessionData } from './actions';
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
                        <div className="card">
                            <div className="card-body">
                                    {sessionData && <OverviewTable data={sessionData} />}
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
            sessionData: state.sessionOverviewReducer.sessionData,
        }
    }
)(SessionsOverview);