import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Link } from 'react-router-dom';
import BaseTable from '../../base/BaseTable';
import ExcelView from './extra_components/ExcelView';

class OverviewTable extends BaseTable {

    viewFormatter = (cell, row) => {
        return <Link to={'/superadmin/phonenumbers/details/' + row.id}><button className="btn btn-sm btn-primary"><i className="fa fa-eye"></i> View</button></Link>;
    }

    getExtraButtonGroup(data) {
        return <ExcelView data={data} />;
    }

    getOptions(data) {
        return {
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
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
                    <TableHeaderColumn width="225" headerAlign='center' dataSort caretRender={this.getSort} dataField='name' dataFormat={this.countryFormatter} >Country Code</TableHeaderColumn>
                    <TableHeaderColumn width="225" headerAlign='center' dataSort caretRender={this.getSort} dataField='displayText' dataFormat={this.phonenumberFormatter} >Phonenumber</TableHeaderColumn>
                    <TableHeaderColumn width="150" headerAlign='center' dataAlign='center'  dataSort caretRender={this.getSort} dataField='foreignerCompatible' dataFormat={this.trueFalseFormatter} >International</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataAlign='center' dataSort caretRender={this.getSort} dataField='public' dataFormat={this.trueFalseFormatter} >Public</TableHeaderColumn>
                    <TableHeaderColumn width="75" headerAlign='center' dataAlign='center' dataField='phoneNumber' dataFormat={this.viewFormatter} >View</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default OverviewTable;