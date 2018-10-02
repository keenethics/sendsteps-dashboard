import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Link } from 'react-router-dom';
import BaseTable from '../../base/BaseTable';
import ExcelView from './extra_components/ExcelView';

class OverviewTable extends BaseTable {

    viewFormatter = (cell, row) => {
        return <Link to={'/superadmin/translations/details/' + row.keyId}><button className="btn btn-sm btn-primary"><i className="fa fa-eye"></i> View</button></Link>;
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
                    <TableHeaderColumn width="100" headerAlign='center' dataAlign='center' dataField='asd' dataFormat={this.viewFormatter} >View</TableHeaderColumn>
                    <TableHeaderColumn width="250" headerAlign='center' dataSort caretRender={this.getSort} dataField='key' dataFormat={this.nameFormatter} >Key</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={this.getSort} dataField='english' dataFormat={this.nameFormatter} >English</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={this.getSort} dataField='dutch' dataFormat={this.nameFormatter} >Dutch</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={this.getSort} dataField='italian' dataFormat={this.nameFormatter} >Italian</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={this.getSort} dataField='french' dataFormat={this.nameFormatter} >French</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={this.getSort} dataField='german' dataFormat={this.nameFormatter} >German</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={this.getSort} dataField='spanish' dataFormat={this.nameFormatter} >Spanish</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={this.getSort} dataField='swedish' dataFormat={this.nameFormatter} >Swedish</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={this.getSort} dataField='danish' dataFormat={this.nameFormatter} >Danish</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={this.getSort} dataField='russian' dataFormat={this.nameFormatter} >Russian</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={this.getSort} dataField='greek' dataFormat={this.nameFormatter} >Greek</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={this.getSort} dataField='portuguese' dataFormat={this.nameFormatter} >Portuguese</TableHeaderColumn>
                    {/* {/* <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={this.getSort} dataField='japanese' dataFormat={this.nameFormatter} >Japanese</TableHeaderColumn> */}
                    {/* <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={this.getSort} dataField='arabic' dataFormat={this.nameFormatter} >Arabic</TableHeaderColumn> */} 
                </BootstrapTable>
            </div>
        )
    }
}
export default OverviewTable;