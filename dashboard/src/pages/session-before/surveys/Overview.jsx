import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { setSurveyData } from './actions';
import { Panel, Button, ButtonGroup } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';
import CreateSurveyContainer from './create/CreateSurveyContainer'
import { get } from '../../../scripts/api';
class SurveysOverview extends React.Component {

    componentDidMount() {

        get(
            'surveys',
            'getOverview',
            {},
            res => this.props.dispatch(setSurveyData(res)),
            err => console.log(err)
        )
    }

    render() {
        
        const { surveys } = this.props;

        console.log(surveys)

        return (
            <div>
                <HeaderPanel title={"Survey Overview"} />
                <div className="container-fluid">
                    <Panel>
                        <Panel.Body>
                            <CreateSurveyContainer  />
                            <hr/>
                            {!surveys &&
                            <p className="text-center">
                                There are no surveys to display...
                            </p>}
                            {surveys && <OverviewTable data={surveys.content} />}
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