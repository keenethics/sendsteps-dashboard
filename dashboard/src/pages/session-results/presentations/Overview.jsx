import * as React from 'react'; 
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { setPresentationData } from './actions';
import HeaderPanel from '../../../components/common/HeaderPanel';
import './Overview.scss';
import { get } from '../../../scripts/api';
import LoadingPlaceholder from '../../base/LoadingPlaceholder';

class PresentationsOverview extends React.Component {
   
    componentDidMount() {
        get(
            'presentations', 
            'getOverview', 
            {}, 
            result => this.props.dispatch(setPresentationData(result.content)),
            error => console.log(error)
        )
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
                    <div className="card">
                        <div className="card-body">
                            {presentationResults && <OverviewTable data={presentationResults} />}
                            {!presentationResults && <LoadingPlaceholder />}
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
            presentationResults: state.sessionResultsReducer.presentationResults
        }
    }
)(PresentationsOverview);