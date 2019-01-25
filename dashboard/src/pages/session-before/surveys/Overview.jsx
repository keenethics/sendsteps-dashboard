import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { setSurveyData } from './actions';
import { Panel } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';
import CreateSurveyContainer from './create/CreateSurveyContainer'
import { get, post } from '../../../scripts/api';
import PlaySurveyModal from './PlaySurveyModal';
import { toast } from 'react-toastify';
class SurveysOverview extends React.Component {

    componentDidMount() {
       this.getSurveyData()
    }

    getSurveyData = () => {
        get(
            'surveys',
            'getOverview',
            {},
            res => this.props.dispatch(setSurveyData(res)),
            err => console.log(err)
        )
    }

    updateSurveyStatus = (newStatus, rowId) => {
        post(
            'surveys',
            'updateSurveyStatus',
            JSON.stringify({
                surveyId: rowId,
                newStatus
            }),
            res => {
                this.props.dispatch(setSurveyData(res))
                toast("Survey Status updated!")
            },
            error => console.log(error)
        )
    }

    render() {
        
        const { surveys } = this.props;

        return (
            <div>
                <HeaderPanel 
                    title={"Survey Overview"} 
                    content={
                        `By activating the “Survey” tab on the response website, 
                        your audience will be enabled to answer survey questions. 
                        Survey results will only be visible within your dashboard and won’t be published on the presentation screen. 
                        The survey can be send out in advance of your session to pre-collect attendee data. 
                        The Survey tab can also be used as an evaluation tool throughout or at the end of your session.`
                    } 
                />
                <div className="container-fluid">
                    <Panel>
                        <Panel.Body>
                            <CreateSurveyContainer  />
                            <hr/>
                            {!surveys &&
                            <p className="text-center">
                                There are no surveys to display...
                            </p>}
                            {surveys && 
                            <OverviewTable 
                                data={surveys.content} 
                                updateSurveyStatus={this.updateSurveyStatus} 
                            />}
                        </Panel.Body>
                    </Panel>
                </div>
                <PlaySurveyModal updateSurveyStatus={this.updateSurveyStatus} />
            </div>
        )
    }
} 

export default connect(
    (state) => {
        return {
            surveys: state.surveyReducer.surveys
        }
    }
)(SurveysOverview);