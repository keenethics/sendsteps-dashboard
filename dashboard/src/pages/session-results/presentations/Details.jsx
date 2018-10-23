import React from "react";
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import moment from 'moment';
import { Panel } from 'react-bootstrap';
import HeaderPanel from "../../../components/common/HeaderPanel";
import BottomSaveBar from "../../../components/common/BottomSaveBar";
import TooltipNotification from "../../../components/common/TooltipNotification";
import './Details.scss';
import * as jsPDF from 'jspdf';
class PresentationDetails extends React.Component {
    componentDidMount() {
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
        this.props.dispatch(fetchResult('presentations', 'getDetails', apiParams));
    }

    exportPDF() {

        // @TODO Move this to separate component
        const doc = new jsPDF();
        const { data } = this.props;

        doc.setFont('Roboto Slab');
        doc.setTextColor(0, 122, 194);
        doc.setFontSize(24);

        doc.text(data.name, 20, 20);

        doc.setFontSize(16);
        doc.text('StartTime: ' + this.getTime().startTime, 20, 30);
        doc.text('EndTime: ' + this.getTime().endTime, 20, 40);
        doc.save(data.name + '.pdf');
    }

    getTime() {
        const dateFormat = 'YYYY-MM-DD HH:mm:ss';
        const stringFormat = "dddd, MMMM Do YYYY, h:mm:ss A";

        return {
            startTime: moment(this.props.data.startTime, dateFormat).format(stringFormat),
            endTime: moment(this.props.data.endTime, dateFormat).format(stringFormat)
        }
    } 
    
    render() {
        let { data } = this.props;
        if(!data) {
            return null;
        }
        console.log(data);
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
                                        <h2>{data.name}</h2>
                                        <hr/>
                                    </div>
                                    
                                    <div className="col-sm-6">
                                        <p><strong>Start time:  </strong></p> 
                                    </div>   

                                    <div className="col-sm-6">
                                        <p><i className="far fa-clock"></i> {this.getTime().startTime}</p> 
                                    </div> 

                                    <div className="col-sm-6">
                                        <p><strong>End time:</strong> </p>
                                    </div>  

                                    <div className="col-sm-6">
                                        <p><i className="far fa-clock"></i> {this.getTime().endTime}</p>
                                    </div>  
                                </div>       
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="btn-toolbar">
                                            <button onClick={() => this.exportPDF()} className="btn btn-danger"><i className="fa fa-file-pdf"></i> Export PDF (.pdf)</button>
                                            <button className="btn btn-success"><i className="fa fa-file-excel"></i> Export Excel (.xlsx)</button>
                                            <div className="btn-toolbar pull-right">
                                                <div className="btn-group">
                                                    <button className="btn btn-default">
                                                        Group Results
                                                    </button>
                                                    <button className="btn btn-default">
                                                        Results per Person
                                                    </button>
                                                </div>
                                                <TooltipNotification title="pie-chart" tooltip={"Pie Chart"} placement={"top"}>
                                                    <button className="btn btn-default">
                                                        <i className="fa fa-chart-pie"></i>
                                                    </button>
                                                </TooltipNotification>

                                                <TooltipNotification title="bar-chart" tooltip={"Bar Chart"} placement={"top"}>
                                                    <button className="btn btn-default">
                                                        <i className="fa fa-chart-bar"></i>
                                                    </button>
                                                </TooltipNotification>

                                                <TooltipNotification title="side-bar-chart" tooltip={"Side Bar Chart"} placement={"top"}>
                                                    <button className="btn btn-default">
                                                        <i className="fa fa-chart-bar side-chart"></i>
                                                    </button>
                                                </TooltipNotification>

                                                <TooltipNotification title="percentage-result" tooltip={"Results as Percentage"} placement={"top"}>
                                                    <button className="btn btn-default">
                                                        <i className="fa fa-percent"></i>
                                                    </button>
                                                </TooltipNotification>

                                                <TooltipNotification title="numeric-result" tooltip={"Numeric Results"} placement={"top"}>
                                                    <button className="btn btn-default">
                                                        <strong><small>...123</small></strong>
                                                    </button>
                                                </TooltipNotification>
                                                <hr/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-md-12">
                                        ... Results
                                    </div>                                
                                </div>
                            </div>
                        </div>
                    </Panel.Body>
                </Panel>
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
)(PresentationDetails);