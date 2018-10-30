import React from "react";
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import moment from 'moment';
import { Panel } from 'react-bootstrap';
import HeaderPanel from "../../../components/common/HeaderPanel";
import BottomSaveBar from "../../../components/common/BottomSaveBar";
import PresentationResults from "./extra-components/PresentationResults";
import './Details.scss';
class PresentationDetails extends React.Component {
    componentDidMount() {
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
        this.props.dispatch(fetchResult('presentations', 'getDetails', apiParams));
    }

    

    getTime() {
        const dateFormat = 'YYYY-MM-DD HH:mm:ss';
        const stringFormat = "dddd, MMMM Do YYYY, h:mm:ss A";

        return {
            startTime: moment(this.props.data.presentationStart, dateFormat).format(stringFormat),
            endTime: moment(this.props.data.presentationEnd, dateFormat).format(stringFormat)
        }
    } 

    render() {
        
        let { data } = this.props;

        return (
            <div>
                <HeaderPanel 
                    title={"Presentation results"}
                />
                <Panel>
                    <Panel.Body>
                        <div className="container-fluid">
                            <div className="row">
                                <input name='id' id='phonenumber-id' type='hidden' />
                                <div className="row">  
                                    <div className="col-sm-12">
                                        <h2>{data && data.presentationTitle}</h2>
                                        <hr/>
                                    </div>
                                    
                                    <div className="col-sm-6">
                                        <p><strong>Start time:  </strong></p> 
                                    </div>   

                                    <div className="col-sm-6">
                                        <p><i className="far fa-clock"></i> {data && this.getTime().startTime}</p> 
                                    </div> 

                                    <div className="col-sm-6">
                                        <p><strong>End time:</strong> </p>
                                    </div>  

                                    <div className="col-sm-6">
                                        <p><i className="far fa-clock"></i> {data && this.getTime().endTime}</p>
                                    </div>  

                                    <div className="col-sm-6">
                                        <p><strong>Active attendees:</strong> </p>
                                    </div>  

                                    <div className="col-sm-6">
                                        <p><i className="fa fa-users"></i> x {data && data.nrOfActiveAttendees}</p>
                                    </div> 

                                    <div className="col-sm-6">
                                        <p><strong>Amount of responses:</strong> </p>
                                    </div>  

                                    <div className="col-sm-6">
                                        <p><i className="fa fa-comments"></i> x {data && data.nrOfResponses}</p>
                                    </div> 
                                </div>       
                                <hr/>
                                <div className="row">
                                    <div className="col-md-12">
                                        {data && <PresentationResults data={data} />}
                                    </div>                                
                                </div>
                            </div>
                        </div>
                    </Panel.Body>
                </Panel>
                <BottomSaveBar noSave={true} />
            </div>
        );
    }
} export default connect(
    (state) => {
        return {
            data: state.apiReducer.data,
        }
    }
)(PresentationDetails);