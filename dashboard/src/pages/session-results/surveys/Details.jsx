import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import BreadCrumbs from '../../../pages/base/BreadCrumbs';
import moment from 'moment';
import { Panel } from 'react-bootstrap';
import BottomSaveBar from "../../../components/common/BottomSaveBar";

class SurveyResultsDetails extends React.Component {
    componentWillMount() {
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
        this.props.dispatch(fetchResult('surveys', 'getResultsDetails', apiParams));
    }
    
    render() {
        let { data, match } = this.props;

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
                <Panel><Panel.Body>
                    <h1>Presentation results</h1>   
                </Panel.Body></Panel>
     
                <BreadCrumbs urlList={match.url} />
                <Panel><Panel.Body>
                    <div className="container-fluid">
                        
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
                                    <p><i className="far fa-clock"></i> {startTime.format(stringFormat)}</p> 
                                </div> 

                                <div className="col-sm-6">
                                    <p><strong>End time:</strong> </p>
                                </div>  

                                <div className="col-sm-6">
                                    <p><i className="far fa-clock"></i> {endTime.format(stringFormat)}</p>
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
                </Panel.Body></Panel>   
                <BottomSaveBar />
            </div>
        );
    }
} export default connect(
    (state) => {
        return {
            data: state.apiReducer.data,
        }
    }
)(SurveyResultsDetails);