import React from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import BaseTable from '../../base/BaseTable';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router-dom';

class OverviewTable extends BaseTable {

    viewFormatter = (cell, row) => {
        return <Link to={'/session-results/surveys/details/' + row.id}><button className="btn btn-sm btn-primary"><i className="fa fa-eye"></i> View</button></Link>;
    }

    getOptions() {
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
                <BootstrapTable pagination data={this.props.data} options={this.getOptions()} search>
                    <TableHeaderColumn width="250" headerAlign='center' dataSort caretRender={this.getSort} dataField='name' dataFormat={this.nameFormatter} >Name</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' dataSort caretRender={this.getSort} dataField='startTime' dataFormat={this.dateFormatter} >Start time</TableHeaderColumn>
                    <TableHeaderColumn width="100" isKey={true} headerAlign='center' dataAlign='center' dataField='id' dataFormat={this.viewFormatter} >View</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default OverviewTable;