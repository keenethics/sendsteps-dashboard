import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Link } from 'react-router-dom';
import BaseTable from '../../base/BaseTable';

class OverviewTable extends BaseTable {

    viewFormatter = (cell, row) => {
        return <Link to={'/superadmin/sessions/details/' + cell}><button className="btn btn-sm btn-primary"><i className="fa fa-eye"></i> View</button></Link>;
    }

    getExtraButtonGroup(data) {
        // return <ExcelView data={data} />;
        return '';
    }

    getOptions(data) {
        return {
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            sortName: 'lastSessionStarted',
            sortOrder: 'desc',
            clearSearch: true,
            clearSearchBtn: this.getClearBtn,
            btnGroup: () => this.getExtraButtonGroup(data)
        };
    }
    
    render() {
        const { data } = this.props;
        return (
            <div>
                <BootstrapTable pagination data={data} options={this.getOptions(data)} keyField='id' search>
                    <TableHeaderColumn width="225" headerAlign='center' dataSort caretRender={this.getSort} dataField='email' dataFormat={this.nameFormatter} >Email</TableHeaderColumn>
                    <TableHeaderColumn width="150" headerAlign='center' dataSort caretRender={this.getSort} dataField='endTime' dataFormat={this.nameFormatter} >Renewal Date</TableHeaderColumn>
                    <TableHeaderColumn width="115" headerAlign='center' dataSort caretRender={this.getSort} dataField='numSessionsStarted' dataFormat={this.nameFormatter} >Times Started</TableHeaderColumn>
                    <TableHeaderColumn width="150" headerAlign='center' dataSort caretRender={this.getSort} dataField='lastSessionStarted' dataFormat={this.nameFormatter} >Last Started</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={this.getSort} dataField='pluginName' dataFormat={this.nameFormatter} >Add-In</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={this.getSort} dataField='userRole' dataFormat={this.nameFormatter} >User Type</TableHeaderColumn>
                    <TableHeaderColumn width="225" headerAlign='center' dataSort caretRender={this.getSort} dataField='responseCode' dataFormat={this.nameFormatter} >Response Code</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataAlign='center' dataField='sessionId' dataFormat={this.viewFormatter} >View</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default OverviewTable;