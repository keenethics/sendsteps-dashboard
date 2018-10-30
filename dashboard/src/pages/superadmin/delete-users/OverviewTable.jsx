import React, { Component }  from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Link } from 'react-router-dom';
import { getOptions, getSort, getPhonenumberFormatter } from '../../base/BaseTable';

class OverviewTable extends Component {
    
    viewFormatter = (cell, row) => {
        return <Link to={'/superadmin/phonenumbers/details/' + row.id}><button className="btn btn-sm btn-danger"><i className="fa fa-times"></i> Delete</button></Link>;
    }
    
    render() {
        const { data } = this.props;
        return (
            <div>
                <BootstrapTable pagination data={data} options={getOptions()} search>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={getSort} dataField='account_id' dataFormat={this.account_id} >Account ID</TableHeaderColumn>
                    <TableHeaderColumn width="70" headerAlign='center' dataSort caretRender={getSort} dataField='user_id' dataFormat={getPhonenumberFormatter} >User ID</TableHeaderColumn>
                    <TableHeaderColumn width="350" headerAlign='center' dataSort caretRender={getSort} dataField='email' dataFormat={this.email} >Email</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataAlign='center' dataSort caretRender={getSort} dataField='origin' dataFormat={this.origin} >Origin</TableHeaderColumn>
                    <TableHeaderColumn width="75" headerAlign='center' dataAlign='center' dataField='none' isKey={true} dataFormat={this.viewFormatter} >Delete</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default OverviewTable;