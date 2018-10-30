import React, { Component }  from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Link } from 'react-router-dom';
import { getOptions, getSort, getNameFormatter } from '../../base/BaseTable';
import ExcelView from './extra_components/ExcelView';

class OverviewTable extends Component {

    viewFormatter = (cell, row) => {
        return <Link to={'/superadmin/translations/details/' + row.keyId}><button className="btn btn-sm btn-primary"><i className="fa fa-eye"></i> View</button></Link>;
    }

    getExtraButtonGroup(data) {
        return <ExcelView data={data} />;
    }

    getOptions(data) {
        return {
            ...getOptions(),
            btnGroup: () => this.getExtraButtonGroup(data)
        };
    }
    
    render() {

        const { data } = this.props;
        return (
            <div>
                <BootstrapTable pagination data={data} options={this.getOptions(data)} keyField='id' search>
                    <TableHeaderColumn width="100" headerAlign='center' dataAlign='center' dataField='asd' dataFormat={this.viewFormatter} >View</TableHeaderColumn>
                    <TableHeaderColumn width="250" headerAlign='center' dataSort caretRender={getSort} dataField='key' dataFormat={getNameFormatter} >Key</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={getSort} dataField='english' dataFormat={getNameFormatter} >English</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={getSort} dataField='dutch' dataFormat={getNameFormatter} >Dutch</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={getSort} dataField='italian' dataFormat={getNameFormatter} >Italian</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={getSort} dataField='french' dataFormat={getNameFormatter} >French</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={getSort} dataField='german' dataFormat={getNameFormatter} >German</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={getSort} dataField='spanish' dataFormat={getNameFormatter} >Spanish</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={getSort} dataField='swedish' dataFormat={getNameFormatter} >Swedish</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={getSort} dataField='danish' dataFormat={getNameFormatter} >Danish</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={getSort} dataField='russian' dataFormat={getNameFormatter} >Russian</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={getSort} dataField='greek' dataFormat={getNameFormatter} >Greek</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={getSort} dataField='portuguese' dataFormat={getNameFormatter} >Portuguese</TableHeaderColumn>
                    {/* {/* <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={getSort} dataField='japanese' dataFormat={getNameFormatter} >Japanese</TableHeaderColumn> */}
                    {/* <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={getSort} dataField='arabic' dataFormat={getNameFormatter} >Arabic</TableHeaderColumn> */} 
                </BootstrapTable>
            </div>
        )
    }
}
export default OverviewTable;