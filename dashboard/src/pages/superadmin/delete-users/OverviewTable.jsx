import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Link } from 'react-router-dom';
import BaseTable from '../../base/BaseTable';

class OverviewTable extends BaseTable {

    viewFormatter = (cell, row) => {
        return <Link to={'/superadmin/phonenumbers/details/' + row.id}><button className="btn btn-sm btn-danger"><i className="fa fa-times"></i> Delete</button></Link>;
    }
    
    render() {
        console.log(this.account_id);
        return (
            <div>
                <BootstrapTable pagination data={this.props.data} options={this.getOptions()} search>
                    <TableHeaderColumn width="225" headerAlign='center' dataSort caretRender={this.getSort} dataField='account_id' dataFormat={this.account_id} >Account ID</TableHeaderColumn>
                    <TableHeaderColumn width="225" headerAlign='center' dataSort caretRender={this.getSort} dataField='user_id' dataFormat={this.phonenumberFormatter} >User ID</TableHeaderColumn>
                    <TableHeaderColumn width="150" headerAlign='center' dataAlign='center'  dataSort caretRender={this.getSort} dataField='email' dataFormat={this.email} >Email</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataAlign='center' dataSort caretRender={this.getSort} dataField='origin' dataFormat={this.origin} >Origin</TableHeaderColumn>
                    <TableHeaderColumn width="75" headerAlign='center' dataAlign='center' dataField='phoneNumber' isKey={true} dataFormat={this.viewFormatter} >Delete</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default OverviewTable;