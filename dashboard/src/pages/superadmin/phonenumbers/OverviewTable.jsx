import React, { Component }  from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Link } from 'react-router-dom';
import { getPhonenumberFormatter, getCountryFormatter, getSort, getOptions, getTrueFalseFormatter } from '../../base/BaseTable';
import ExcelView from './extra_components/ExcelView';

class OverviewTable extends Component {

    viewFormatter = (cell, row) => {
        return <Link to={'/superadmin/phonenumbers/details/' + row.id}><button className="btn btn-sm btn-primary"><i className="fa fa-eye"></i> View</button></Link>;
    }

    getExtraButtonGroup(data) {
        return <ExcelView data={data} />;
    }

    getOptions(data) {
        return {
            ...getOptions(),
            sortName: 'name',
            sortOrder: 'asc',
            btnGroup: () => this.getExtraButtonGroup(data)
        };
    }
    
    render() {

        const { data } = this.props;
        
        return (
            <div>
                <BootstrapTable pagination data={data} options={this.getOptions(data)} keyField='id' search>
                    <TableHeaderColumn width="225" headerAlign='center' dataSort caretRender={getSort} dataField='name' dataFormat={getCountryFormatter} >Country Code</TableHeaderColumn>
                    <TableHeaderColumn width="225" headerAlign='center' dataSort caretRender={getSort} dataField='displayText' dataFormat={getPhonenumberFormatter} >Phonenumber</TableHeaderColumn>
                    <TableHeaderColumn width="150" headerAlign='center' dataAlign='center'  dataSort caretRender={getSort} dataField='foreignerCompatible' dataFormat={getTrueFalseFormatter} >International</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataAlign='center' dataSort caretRender={getSort} dataField='public' dataFormat={getTrueFalseFormatter} >Public</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataAlign='center' dataField='phoneNumber' dataFormat={this.viewFormatter} >View</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default OverviewTable;