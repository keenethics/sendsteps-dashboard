import React from "react";
import { connect } from 'react-redux';
import { setSurveyDetails } from './actions'; 
import moment from 'moment';
import { Panel } from 'react-bootstrap';
import BottomSaveBar from "../../../components/common/BottomSaveBar";
import HeaderPanel from "../../../components/common/HeaderPanel";
import { get } from "../../../scripts/api";
import CreateQuestionContainer from "./question/CreateQuestionContainer";
import SurveyNameContainer from "./create/SurveyNameContainer";

class SurveyDetails extends React.Component {

    componentDidMount() {
        get('surveys', 'getDetails',
            JSON.stringify({id: this.props.match.params.id}),
            result => {
                console.log(result)
                this.props.dispatch(setSurveyDetails(result.content))
            },
            err => console.log(err)
        )
    }

    formatTime(time) {
        const dateFormat = 'YYYY-MM-DD HH:mm:ss';
        const stringFormat = "dddd, MMMM Do YYYY, h:mm:ss A";

        const momented = moment(time, stringFormat);
        const stringed = momented.format(dateFormat);
        console.log(momented);
        console.log(stringed);
        return moment(time, dateFormat).format(stringFormat);
    }
    
    render() {

        const { surveyDetails } = this.props;

        return (
            <div>  
                <HeaderPanel title={"Survey Details"} />
                <div className="container-fluid">
                    {surveyDetails &&
                    <Panel>
                        <Panel.Body>
                            <h3>Edit Survey</h3>
                            <hr />
                            <SurveyNameContainer name={surveyDetails.survey_name} />
                            <CreateQuestionContainer />
                        </Panel.Body>
                    </Panel>}
                    <BottomSaveBar />
                </div>
            </div>
        );
    }
} export default connect(
    (state) => {
        return {
            surveyDetails: state.surveyReducer.surveyDetails,
        }
    }
)(SurveyDetails);