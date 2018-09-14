import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Link } from 'react-router-dom';
import BaseTable from '../../base/BaseTable';

class OverviewTable extends BaseTable {

    viewFormatter = (cell, row) => {
        return <Link to={'/superadmin/edit-dashboard/details/' + row.id}><button className="btn btn-sm btn-primary"><i className="fa fa-eye"></i> View</button></Link>;
    }
    
    render() {
        return (
            <div>
                <BootstrapTable pagination data={this.props.data} options={this.getOptions()} search>
                    <TableHeaderColumn width="225" headerAlign='center' dataSort caretRender={this.getSort} dataField='name' dataFormat={this.phonenumberFormatter} >Name</TableHeaderColumn>
                    <TableHeaderColumn width="150" headerAlign='center' dataSort caretRender={this.getSort} dataField='dashboardUrl' dataFormat={this.phonenumberFormatter} >Dashboard URL</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={this.getSort} dataField='websiteAddress' dataFormat={this.phonenumberFormatter} >Response Site URL</TableHeaderColumn>
                    <TableHeaderColumn width="75" headerAlign='center' dataAlign='center' dataField='none' isKey={true} dataFormat={this.viewFormatter} >View</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default OverviewTable;