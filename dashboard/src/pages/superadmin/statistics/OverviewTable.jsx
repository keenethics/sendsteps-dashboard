import React, { Component }  from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Link } from 'react-router-dom';
import { getOptions, getSort, getNameFormatter } from '../../base/BaseTable';
// import ExcelView from './extra_components/ExcelView';

export default class OverviewTable extends Component {

    viewFormatter = (cell, row) => {
        return <Link to={'/superadmin/translations/details/' + row.keyId}><button className="btn btn-primary"><i className="fa fa-eye"></i> View</button></Link>;
    }

    // getExtraButtonGroup(data) {
    //     return <ExcelView data={data} />;
    // }

    getOptions(data) {
        return {
            ...getOptions()
            // btnGroup: () => this.getExtraButtonGroup(data)
        };
    }
    
    render() {

        const { data } = this.props;
        return (
            <div>
                <BootstrapTable pagination data={data} options={this.getOptions(data)} keyField='id' search>
                    <TableHeaderColumn width="100" headerAlign='center' dataAlign='center' dataField='asd' dataFormat={this.viewFormatter} >View</TableHeaderColumn>
                    <TableHeaderColumn width="250" headerAlign='center' dataSort caretRender={getSort} dataField='key' dataFormat={getNameFormatter} >ID</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataSort caretRender={getSort} dataField='english' dataFormat={getNameFormatter} >Name</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}