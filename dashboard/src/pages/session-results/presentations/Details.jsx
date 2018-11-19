import React from "react";
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import { setPresentationDetails } from './actions';
import moment from 'moment';
import { Panel } from 'react-bootstrap';
import HeaderPanel from "../../../components/common/HeaderPanel";
import BottomSaveBar from "../../../components/common/BottomSaveBar";
import PresentationResults from "./extra-components/PresentationResults";
class PresentationDetails extends React.Component {
    componentDidMount() {
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
        this.props.dispatch(
            fetchResult(
                'presentations', 
                'getDetails', 
                apiParams,
                setPresentationDetails));
    }

    

    getTime() {
        const dateFormat = 'YYYY-MM-DD HH:mm:ss';
        const stringFormat = "dddd, MMMM Do YYYY, h:mm:ss A";

        return {
            startTime: moment(this.props.presentationDetails.presentationStart, dateFormat).format(stringFormat),
            endTime: moment(this.props.presentationDetails.presentationEnd, dateFormat).format(stringFormat)
        }
    } 

    render() {
        
        let { presentationDetails } = this.props;

        return (
            <div>
                <HeaderPanel 
                    title={"Presentation results"}
                />
                <div className="container-fluid">
                <Panel>
                    <Panel.Body>
                                <input name='id' id='phonenumber-id' type='hidden' />
                                <div className="row">  
                                    <div className="col-sm-12">
                                        <h2>{presentationDetails && presentationDetails.presentationTitle}</h2>
                                        <hr/>
                                    </div>
                                    
                                    <div className="col-sm-6">
                                        <p><strong>Start time:  </strong></p> 
                                    </div>   

                                    <div className="col-sm-6">
                                        <p><i className="far fa-clock"></i> {presentationDetails && this.getTime().startTime}</p> 
                                    </div> 

                                    <div className="col-sm-6">
                                        <p><strong>End time:</strong> </p>
                                    </div>  

                                    <div className="col-sm-6">
                                        <p><i className="far fa-clock"></i> {presentationDetails && this.getTime().endTime}</p>
                                    </div>  

                                    <div className="col-sm-6">
                                        <p><strong>Active attendees:</strong> </p>
                                    </div>  

                                    <div className="col-sm-6">
                                        <p><i className="fa fa-users"></i> x {presentationDetails && presentationDetails.nrOfActiveAttendees}</p>
                                    </div> 

                                    <div className="col-sm-6">
                                        <p><strong>Amount of responses:</strong> </p>
                                    </div>  

                                    <div className="col-sm-6">
                                        <p><i className="fa fa-comments"></i> x {presentationDetails && presentationDetails.nrOfResponses}</p>
                                    </div> 
                                </div>       
                                <hr/>
                                <div className="row">
                                    <div className="col-md-12">
                                        {presentationDetails && <PresentationResults data={presentationDetails} />}
                                    </div>                                
                                </div>
                        </Panel.Body>
                    </Panel>
                <BottomSaveBar noSave={true} />
                </div>
            </div>
        );
    }
} export default connect(
    (state) => {
        return {
            presentationDetails: state.sessionResultsReducer.presentationDetails,
        }
    }
)(PresentationDetails);