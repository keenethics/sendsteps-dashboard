import React from "react";
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import { setSurveyDetails } from './actions'; 
import moment from 'moment';
import { Panel } from 'react-bootstrap';
import BottomSaveBar from "../../../components/common/BottomSaveBar";
import HeaderPanel from "../../../components/common/HeaderPanel";

class SurveyDetails extends React.Component {
    componentDidMount() {
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
        this.props.dispatch(fetchResult('surveys', 'getDetails', apiParams, setSurveyDetails));
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
        let { surveyDetails } = this.props;

            // active:"1"
            // automaticallyClosed:"0"
            // endTime:"2018-02-06 15:12:04"
            // id:"183"
            // isDeleted:"0"
            // limited:"notLimited"
            // name:"Presentation1"
            // sessionId:"591"
            // sessionRunId:"183"
            // startTime:"2018-02-06 14:31:27"

        console.log(surveyDetails);

        return (
            <div>  
                <HeaderPanel title={"Surveys"} />
                <div className="container-fluid">
                    <Panel>
                        <Panel.Body>
                            <div className="row">
                                <input name='id' id='phonenumber-id' type='hidden' />
                                <div className="row">  
                                    <div className="col-sm-12">
                                        <h2>{surveyDetails && surveyDetails.name}</h2>
                                    </div>
                                    <div className="col-sm-6">
                                        <p><strong>Start time:  </strong></p> 
                                    </div>   

                                    <div className="col-sm-6">
                                        <p><i className="fa fa-clock-o"></i> {surveyDetails && this.formatTime(surveyDetails.startTime)}</p> 
                                    </div> 

                                    <div className="col-sm-6">
                                        <p><strong>End time:</strong> </p>
                                    </div>  

                                    <div className="col-sm-6">
                                        <p><i className="fa fa-clock-o"></i> {surveyDetails && this.formatTime(surveyDetails.endTime)}</p>
                                    </div>  
                                </div>       
                                
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group keyword-items">
                                            <ul className="list-group">
                                            </ul>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </Panel.Body>
                    </Panel>
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