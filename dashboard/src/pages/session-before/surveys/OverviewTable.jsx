import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { getOptions, getSort, getNameFormatter, getDateFormatter } from '../../base/BaseTable';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router-dom';
import DeleteSurveyModal from './delete/DeleteSurveyModal';
import { setDeleteSurveyId } from './actions'
import { connect } from 'react-redux'
class OverviewTable extends Component {

    toggleDelete = rowId => {
        this.props.dispatch(setDeleteSurveyId(rowId))
    }

    toggleDuplicate = rowId => {
        
    }

    getSurveyActions = (cell, row) => {
        return (
            <span>
                <Link to={'/session-before/surveys/details/' + row.id}>
                    <Button bsStyle="primary">
                        <i className="fa fa-pencil"></i> Edit
                    </Button>
                </Link> 
                <Button bsStyle="primary" onClick={() => this.duplicate(row.id)}>
                    <i className="fa fa-clone"></i> Duplicate
                </Button>
                <Button bsStyle="danger" onClick={() => this.toggleDelete(row.id)}>
                    <i className="fa fa-trash"></i> Delete
                </Button>
            </span>
        )
    }

    deleteSurvey = () => {

    }

    render() {
        return (
            <div>
                <BootstrapTable pagination data={this.props.data} options={getOptions()} search>
                    <TableHeaderColumn headerAlign='center' dataSort caretRender={getSort} dataField='name' dataFormat={getNameFormatter} >Survey Name</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' dataSort caretRender={getSort} dataField='startTime' dataFormat={getDateFormatter} >Start Date/Time</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' dataSort caretRender={getSort} dataField='startTime' dataFormat={getNameFormatter} >Answered Surveys</TableHeaderColumn>
                    <TableHeaderColumn width="300px" isKey={true} headerAlign='center' dataAlign='center' dataField='id' dataFormat={this.getSurveyActions} >Actions</TableHeaderColumn>
                </BootstrapTable>
                <DeleteSurveyModal />
            </div>
        )
    }
}
export default connect()(OverviewTable);