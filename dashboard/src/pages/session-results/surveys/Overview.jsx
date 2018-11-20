import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import { setSurveyData } from './actions';
import { Panel } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';

class SurveyResultsOverview extends React.Component {
   
    componentDidMount() {
        this.props.dispatch(
            fetchResult(
                'surveys', 
                'getResultsOverview', 
                {}, 
                setSurveyData
            )
        );
    }

    render() {
        
        const { surveyResults } = this.props;
        
        return (
            <div>
                <HeaderPanel title={"Survey Results Overview"} />
                <div className="container-fluid">
                    <Panel>
                        <Panel.Body>
                            {surveyResults && <OverviewTable data={surveyResults} />}
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
            surveyResults: state.surveyResultsReducer.surveyResults
        }
    }
)(SurveyResultsOverview);