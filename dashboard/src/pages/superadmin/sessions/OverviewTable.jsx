import React, { Component }  from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Link } from 'react-router-dom';
import { getOptions, getSort, getNameFormatter } from '../../base/BaseTable';

class OverviewTable extends Component {

    viewFormatter = (cell, row) => {
        return <Link to={'/superadmin/sessions/details/' + cell}><button className="btn btn-sm btn-primary"><i className="fa fa-eye"></i> View</button></Link>;
    }

    getExtraButtonGroup(data) {
        return '';
    }

    getOptions(data) {
        return {
            ...getOptions(),
            sortName: 'lastSessionStarted',
            sortOrder: 'desc',
            btnGroup: () => this.getExtraButtonGroup(data)
        };
    }
    
    render() {
        const { data } = this.props;
        return (
            <BootstrapTable pagination data={data} options={this.getOptions(data)} keyField='id' search>
                <TableHeaderColumn width="225" headerAlign='center' dataSort caretRender={getSort} dataField='email' dataFormat={getNameFormatter} >Email</TableHeaderColumn>
                <TableHeaderColumn width="150" headerAlign='center' dataSort caretRender={getSort} dataField='endTime' dataFormat={getNameFormatter} >Renewal Date</TableHeaderColumn>
                <TableHeaderColumn width="115" headerAlign='center' dataSort caretRender={getSort} dataField='numSessionsStarted' dataFormat={getNameFormatter} >Times Started</TableHeaderColumn>
                <TableHeaderColumn width="150" headerAlign='center' dataSort caretRender={getSort} dataField='lastSessionStarted' dataFormat={getNameFormatter} >Last Started</TableHeaderColumn>
                <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={getSort} dataField='pluginName' dataFormat={getNameFormatter} >Add-In</TableHeaderColumn>
                <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={getSort} dataField='userRole' dataFormat={getNameFormatter} >User Type</TableHeaderColumn>
                <TableHeaderColumn width="225" headerAlign='center' dataSort caretRender={getSort} dataField='responseCode' dataFormat={getNameFormatter} >Response Code</TableHeaderColumn>
                <TableHeaderColumn width="100" headerAlign='center' dataAlign='center' dataField='sessionId' dataFormat={this.viewFormatter} >View</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}
export default OverviewTable;