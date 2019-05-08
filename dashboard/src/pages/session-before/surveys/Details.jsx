import React from "react";
import { connect } from 'react-redux';
import { setSurveyDetails } from './actions'; 
import moment from 'moment';
import BottomSaveBar from "../../../components/common/BottomSaveBar";
import HeaderPanel from "../../../components/common/HeaderPanel";
import { get, post } from "../../../scripts/api";
import CreateQuestionContainer from "./question/CreateQuestionContainer";
import SurveyNameContainer from "./create/SurveyNameContainer";
import { toast } from "react-toastify";
import './Details.scss'
class SurveyDetails extends React.Component {

    componentDidMount() {
        this.getSurveyDetails()
    }

    getSurveyDetails = () => {
        get('surveys', 'getDetails',
            { id: this.props.match.params.id },
            result => {
                console.log(result)
                this.props.dispatch(setSurveyDetails(result.content))
            },
            error => console.log(error)
        )
    }

    formatTime(time) {
        const dateFormat = 'YYYY-MM-DD HH:mm:ss';
        const stringFormat = "dddd, MMMM Do YYYY, h:mm:ss A";

        const momented = moment(time, stringFormat);
        const stringed = momented.format(dateFormat);
        return moment(time, dateFormat).format(stringFormat);
    }
    
    saveSettings = () => {
        post(
            'surveys',
            'updateSurveyName',
            {
                id: this.props.match.params.id,
                surveyName: this.props.surveyDetails.survey_name
            },
            result => {
                toast("Survey saved!")
                this.props.dispatch(setSurveyDetails(result.content))
            },
            error => {
                toast("Unable to update survey name")
                console.log(error)
            }
        )
    }

    render() {

        const { surveyDetails } = this.props;

        return (
            <div>  
                <HeaderPanel title={"Survey Details"} />
                <div className="container-fluid">
                    {surveyDetails &&
                    <div className="card">
                        <div className="card-body">
                            <h3>Edit Survey</h3>
                            <hr />
                            <SurveyNameContainer name={surveyDetails.survey_name} />
                            <hr className="mb-0"/>
                            <CreateQuestionContainer />
                        </div>
                    </div>}
                    <BottomSaveBar disabled={surveyDetails && surveyDetails.survey_name.length < 3} onSave={this.saveSettings} />
                </div>
            </div>
        );
    }
} export default connect(
    (state) => {
        return {
            surveyDetails: state.surveyReducer.surveyDetails
        }
    }
)(SurveyDetails);