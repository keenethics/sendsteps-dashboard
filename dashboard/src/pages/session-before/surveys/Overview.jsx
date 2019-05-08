import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { setSurveyData } from './actions';
import HeaderPanel from '../../../components/common/HeaderPanel';
import CreateSurveyContainer from './create/CreateSurveyContainer'
import { get, post } from '../../../scripts/api';
import PlaySurveyModal from './PlaySurveyModal';
import { toast } from 'react-toastify';
import ToggleSurveyModel from './ToggleSurveyModel';
class SurveysOverview extends React.Component {

    state = {
        surveyStatus: null,
        modalOpen: false
    }

    componentDidMount() {
       this.getSurveyData()
    }

    getSurveyData = () => {
        get(
            'surveys',
            'getOverview',
            {},
            res => {
                this.setState({
                    surveyStatus: res.status,
                    surveyURL: res.url
                })
                this.props.dispatch(setSurveyData(res))
            },
            err => console.log(err)
        )
    }

    showSurveyModal = () => {
        this.setState({
            modalOpen: true
        })
    }
    
    hideSurveyModal = () => {
        this.setState({
            modalOpen: false
        })
    }

    toggleSurveyActive = isActive => {
        if(isActive) {
            this.showSurveyModal()
        } else {
            this.toggleSurvey(false)
        }
    }

    toggleSurvey = isActive => {
        post(
            'tabstatus',
            'updateSurveyActive',
            { status: isActive ? "1" : "0" },
            result => {
                this.setState({ surveyStatus: result.status })
                const isEnabled = result.status === "1" ? "enabled" : "disabled"
                toast('Survey Tab ' + isEnabled + '!');
            },
            error => {
                console.log(error)
                toast('Unable to toggle survey tab status...')
            }
        )
    }

    updateSurveyStatus = (newStatus, rowId) => {
        post(
            'surveys',
            'updateSurveyStatus',
            {
                surveyId: rowId,
                status: newStatus
            },
            res => {
                this.props.dispatch(setSurveyData(res))
                toast("Survey Status updated!")
            },
            error => console.log(error)
        )
    }

    render() {
        
        const { surveys } = this.props;
        const { surveyStatus, surveyURL, modalOpen } = this.state;

        console.log(surveys)

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
                    <div className="card">
                        <div className="card-body">
                            <CreateSurveyContainer 
                                surveyStatus={surveyStatus} 
                                toggleSurveyActive={this.toggleSurveyActive}
                                surveyURL={surveyURL} 
                            />
                            <hr/>
                            {!surveys &&
                            <p className="text-center py-3">
                                There are no surveys to display...
                            </p>}
                            {surveys && 
                            <OverviewTable 
                                data={surveys.content} 
                                updateSurveyStatus={this.updateSurveyStatus} 
                            />}
                        </div>
                    </div>
                </div>
                <PlaySurveyModal updateSurveyStatus={this.updateSurveyStatus} />
                <ToggleSurveyModel 
                    modalOpen={modalOpen} 
                    toggleSurvey={() => this.toggleSurvey(true)} 
                    closeModal={this.hideSurveyModal} 
                />
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