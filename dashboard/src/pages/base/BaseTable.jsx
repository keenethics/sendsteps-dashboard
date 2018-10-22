import React, { Component } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import ExcelView from '../../pages/superadmin/phonenumbers/extra_components/ExcelView';

class BaseTable extends Component {

    nameFormatter = cell => {
        return <strong> {cell}</strong>
    }



    // make this pretty somehow
    phonenumberFormatter = cell => {
        return <div className=""> {cell}</div>;
    }

    countryFormatter = (cell, row) => {
        return <span>{cell} ({row.countryIsoCode})</span>;
    }

    trueFalseFormatter = cell => {
        if(cell === "1") {
            return <button disabled={true} className="tf-button btn btn-sm btn-danger"><i className="fa fa-times"></i> No </button>;
        }
        return <button disabled={true} className="tf-button btn btn-sm btn-success"><i className="fa fa-check"></i> Yes</button>;
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

    getSort(direction) {
        return !direction ? 
            <i className="fa fa-sort sort-head"></i> : 
            (
                direction === 'asc' ? 
                <i className="fa fa-sort-down sort-head"></i> : 
                <i className="fa fa-sort-up sort-head"></i> 
            );
    }

    getClearBtn = onClick => {
        return (
            <button onClick={onClick} className="btn btn-danger"><i className="fa fa-trash"></i></button>
        )
    }

    getExcelBtn(data) {
        return <ExcelView  data={data} />
    }
}

export default connect() (BaseTable);