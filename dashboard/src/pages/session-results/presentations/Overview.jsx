import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import { setPresentationData } from './actions';
import { Panel } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';
import './Overview.scss';

class PresentationsOverview extends React.Component {
   
    componentDidMount() {
        this.props.dispatch(fetchResult('presentations', 'getOverview', {}, setPresentationData));
    }

    render() {
        
        const { presentationResults } = this.props;

        return (
            <div>
                <HeaderPanel 
                    title={"Presentation Results Overview"} 
                    content={"Download the results of previous sessions. Decide to keep this information to yourself or to share it with your session attendees."} 
                />
                <div className="container-fluid">
                    <Panel>
                        <Panel.Body>
                            {presentationResults && <OverviewTable data={presentationResults} />}
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
            presentationResults: state.sessionResultsReducer.presentationResults
        }
    }
)(PresentationsOverview);