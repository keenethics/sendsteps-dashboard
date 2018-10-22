import React from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import BaseTable from '../../base/BaseTable';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router-dom';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import moment from 'moment';

class OverviewTable extends BaseTable {

    viewFormatter = (cell, row) => {
        return <Link to={'/session-results/presentations/details/' + row.id}><button className="btn btn-sm btn-primary"><i className="fa fa-eye"></i> View</button></Link>;
    }

    nameFormatter = cell => {
        return <strong> {cell}</strong>
    }

    dateFormatter = (cell, row) => {
        let startTime = moment(row.startTime, 'YYYY-MM-DD HH:mm:ss')
        return <span>
            <OverlayTrigger 
                overlay={<Tooltip id={1}><span><i className="fas fa-clock"></i> {startTime.fromNow()}</span></Tooltip>}
                delay={150}
                placement="top" 
                >
                <span>
                    <div className="btn btn-static date">
                        <i className="far fa-calendar-alt"></i> {startTime.format("dddd, MMMM Do YYYY")} 
                    </div>
                    <div className="btn btn-static date">
                        <i className="far fa-clock"></i> {startTime.format("h:mm:ss a")} 
                    </div>
                </span>
            </OverlayTrigger>
        </span>;
    }

    participantFormatter = cell => {
        return <span><i className="fa fa-users"></i> x {cell}</span>
    }

    getOptions(data) {
        return {
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            clearSearch: true,
            clearSearchBtn: this.getClearBtn,
        };
    }

    render() {
        return (
            <div>
                <BootstrapTable pagination data={this.props.data} keyField='id' options={this.getOptions()} search>
                    <TableHeaderColumn width="250" headerAlign='center' dataSort caretRender={this.getSort} dataField='name' dataFormat={this.nameFormatter} >Name</TableHeaderColumn>
                    <TableHeaderColumn width="150" headerAlign='center' dataAlign='center' dataSort caretRender={this.getSort} dataField='numberOfParticipants' dataFormat={this.participantFormatter} >Participants</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' dataSort caretRender={this.getSort} dataField='startTime' dataFormat={this.dateFormatter} >Start time</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataAlign='center' dataField='presentationId' dataFormat={this.viewFormatter} >View</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default OverviewTable;