import React, { Component } from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { getOptions, getSort, getNameFormatter, getDateFormatter } from '../../base/BaseTable';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router-dom';
class OverviewTable extends Component {

    getViewFormatter = (cell, row) => {
        return <Link to={'/session-before/surveys/details/' + row.id} ><button className="btn btn-sm btn-primary"><i className="fa fa-eye"></i> View</button></Link>;
    }

    render() {
        return (
            <div>
                <BootstrapTable pagination data={this.props.data} options={getOptions()} search>
                    <TableHeaderColumn width="250" headerAlign='center' dataSort caretRender={getSort} dataField='name' dataFormat={getNameFormatter} >Name</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' dataSort caretRender={getSort} dataField='startTime' dataFormat={getDateFormatter} >Start time</TableHeaderColumn>
                    <TableHeaderColumn width="100" isKey={true} headerAlign='center' dataAlign='center' dataField='id' dataFormat={this.getViewFormatter} >View</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default OverviewTable;