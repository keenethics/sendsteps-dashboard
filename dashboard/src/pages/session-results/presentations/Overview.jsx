import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import { Panel } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';

class PresentationsOverview extends React.Component {
   
    componentDidMount() {
        this.props.dispatch(fetchResult('presentations', 'getOverview'));
    }

    render() {
        
        const { data } = this.props;

        return (
            <div>
                <HeaderPanel 
                    title={"Presentation Results Overview"} 
                    content={"Download the results of previous sessions. Decide to keep this information to yourself or to share it with your session attendees."} 
                />
                <div className="container-fluid">
                    <Panel>
                        <Panel.Body>
                            {data && <OverviewTable data={data} />}
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
            data: state.apiReducer.data,
        }
    }
)(PresentationsOverview);