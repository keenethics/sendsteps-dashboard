import React from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import BottomSaveBar from "../../../components/common/BottomSaveBar";
import HeaderPanel from "../../../components/common/HeaderPanel";
import { post } from "../../../scripts/api";

class SurveyResultsDetails extends React.Component {
    componentDidMount() {
        post('surveys', 'getResultsDetails',
            { id: this.props.match.params.id },
            result => console.log(result),
            error => console.log(error)
        )
    }
    
    render() {
        let { data } = this.props;

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

        const dateFormat = 'YYYY-MM-DD HH:mm:ss';
        const stringFormat = "dddd, MMMM Do YYYY, h:mm:ss A";

        const startTime = data && moment(data.startTime, dateFormat);
        const endTime = data && moment(data.endTime, dateFormat);

        return (
            <div>  
                <HeaderPanel title={"Presentation results"} />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <input name='id' id='phonenumber-id' type='hidden' />
                                
                                <div className="row">  
                                    <div className="col-sm-12">
                                        <h2>{data && data.name}</h2>
                                    </div>
                                    <div className="col-sm-6">
                                        <p><strong>Start time:  </strong></p> 
                                    </div>   

                                    <div className="col-sm-6">
                                        <p><i className="fa fa-clock-o"></i> {startTime.format(stringFormat)}</p> 
                                    </div> 

                                    <div className="col-sm-6">
                                        <p><strong>End time:</strong> </p>
                                    </div>  

                                    <div className="col-sm-6">
                                        <p><i className="fa fa-clock-o"></i> {endTime.format(stringFormat)}</p>
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
                        </div>
                    </div>  
                </div>
                <BottomSaveBar />
            </div>
        );
    }
} export default connect(
    (state) => {
        return {
            surveyDetails: state.surveyResultsReducer.surveyDetails
        }
    }
)(SurveyResultsDetails);