import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import { setSurveyData } from './actions';
import { Panel } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';
import ButtonSwitch from '../../../components/common/ButtonSwitch';

class SurveysOverview extends React.Component {
   
    componentDidMount() {
        this.props.dispatch(fetchResult('surveys', 'getOverview', null, setSurveyData));
    }

    render() {
        
        const { surveys } = this.props;

        return (
            <div>
                <HeaderPanel title={"Surveys Overview"} />
                <div className="container-fluid">
                    <Panel>
                        <Panel.Body>
                            <label>Enable surveys</label>
                            <ButtonSwitch />

                            <label>Enable surveys</label>
                            <input className="form-control" value={""} placeholder="Survey name" />

                            <hr/>
                            {surveys && <OverviewTable data={surveys} />}
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
            surveys: state.surveyReducer.surveys,
        }
    }
)(SurveysOverview);