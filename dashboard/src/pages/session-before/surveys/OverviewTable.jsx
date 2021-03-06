import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { getOptions, getSort, getNameFormatter } from '../../base/BaseTable';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router-dom';
import DeleteSurveyModal from './delete/DeleteSurveyModal';
import { setDeleteSurveyId, setCurrentSurveyToPlay } from './actions'
import { connect } from 'react-redux'
import TooltipNotification from '../../../components/common/TooltipNotification';
import moment from 'moment';
import './Overview.scss';
class OverviewTable extends Component {

    toggleDelete = rowId => {
        this.props.dispatch(setDeleteSurveyId(rowId))
    }

    toggleDuplicate = rowId => {
        
    }

    getSurveyActions = (cell, row) => {
        return (
            <span className="survey-btn-padding">
                <Link to={'/session-before/surveys/details/' + row.id}>
                    <div className="btn btn-outline-secondary">
                        <i className="fa fa-pencil"></i> Edit
                    </div>
                </Link> 
                <div className="btn btn-outline-secondary" onClick={() => this.duplicate(row.id)}>
                    <i className="fa fa-clone"></i> Duplicate
                </div>
                <div className="btn btn-outline-danger" onClick={() => this.toggleDelete(row.id)}>
                    <i className="fa fa-trash"></i> Delete
                </div>
            </span>
        )
    }

    getSurveyStartDate = time => {

        const notStarted = time === '0000-00-00 00:00:00' ? true : false

        let startTime = moment(time, 'YYYY-MM-DD HH:mm:ss')

        return <TooltipNotification title={1} placement="top" tooltip={<span><i className="fa fa-clock-o"></i> {notStarted ? "Survey hasn't started yet." : startTime.fromNow()}</span>} >
                <span className="date-col">
                    {notStarted &&
                    <div>
                        <i className="fa fa-times"></i> N/A
                    </div>}
                    {!notStarted && 
                    <>
                        <div className="btn btn-static date">
                            <i className="fa fa-calendar"></i> {startTime.format("dddd, MMMM Do YYYY")} 
                        </div>
                        <div className="btn btn-static date">
                            <i className="fa fa-clock-o"></i> {startTime.format("h:mm:ss a")} 
                        </div>
                    </>}
                </span>
        </TooltipNotification>
    }

    togglePlayDialog = rowId => {
        this.props.dispatch(setCurrentSurveyToPlay(rowId))
    }
    
    getSurveyStatus = (status, row) => {

        const isPlaying = status === "1"
        const isPaused = status === "3"
        const isStopped = status === "2"

        let currentStatus = "Inactive"
        currentStatus = isPlaying ? "Playing" : currentStatus
        currentStatus = isPaused ? "Paused" : currentStatus
        currentStatus = isStopped ? "Stopped" : currentStatus

        return <>
            <div className="survey-btn-padding d-inline-flex text-center" style={{textAlign: 'center'}}>
                {!isPlaying &&
                <TooltipNotification 
                    title="play"
                    placement={"bottom"} 
                    tooltip={"Play Survey " + "(Currently " + currentStatus + ")"}>
                        <button className="btn btn-outline-secondary" onClick={() => this.togglePlayDialog(row.id)}>
                            <i className="fa fa-play"></i>
                        </button>
                </TooltipNotification>}

                {isPlaying &&
                <button className="btn btn-outline-success"  disabled={true}>
                    <i className="fa fa-play"></i>
                </button>}

                {!(isPaused || isStopped) && 
                <TooltipNotification 
                    title="pause"
                    placement={"bottom"} 
                    tooltip={"Pause Survey " + "(Currently " + currentStatus + ")"}>
                        <button className="btn btn-outline-secondary" onClick={() => this.props.updateSurveyStatus(3, row.id)}>
                            <i className="fa fa-pause"></i>
                        </button>
                </TooltipNotification>}

                {(isPaused || isStopped) &&
                <button className="btn btn-outline-secondary" disabled={true}>
                    <i className="fa fa-pause"></i>
                </button>}

                {!isStopped &&
                <TooltipNotification 
                    title="stop"
                    placement={"bottom"} 
                    tooltip={"Stop Survey " + "(Currently " + currentStatus + ")"}>
                        <button className="btn btn-outline-primary" 
                            onClick={() => this.props.updateSurveyStatus(2, row.id)} 
                            disabled={isStopped}>
                            <i className="fa fa-stop"></i>
                        </button>
                </TooltipNotification>}

                {isStopped &&
                <button className="btn btn-outline-secondary" disabled={true}>
                    <i className="fa fa-stop"></i>
                </button>}
            </div>
        </>
    }

    render() {
        return (
            <div>
                <BootstrapTable pagination data={this.props.data} options={getOptions()} search>
                    <TableHeaderColumn headerAlign='center' dataSort caretRender={getSort} dataField='name' dataFormat={getNameFormatter} >Survey Name</TableHeaderColumn>
                    <TableHeaderColumn width="250px" headerAlign='center' dataSort caretRender={getSort} dataField='start_datetime' dataFormat={this.getSurveyStartDate} >Start Date/Time</TableHeaderColumn>
                    <TableHeaderColumn width="200px" headerAlign='center' dataSort caretRender={getSort} dataAlign='center' dataField='status' dataFormat={this.getSurveyStatus} >Status</TableHeaderColumn>
                    <TableHeaderColumn width="350px" isKey={true} headerAlign='center' dataAlign='center' dataField='id' dataFormat={this.getSurveyActions} >Actions</TableHeaderColumn>
                </BootstrapTable>
                <DeleteSurveyModal />
            </div>
        )
    }
}
export default connect()(OverviewTable);