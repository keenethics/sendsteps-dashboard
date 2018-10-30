import React, { Component } from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { getSort, getOptions, getNameFormatter, getDateFormatter, getParticipantFormatter } from '../../base/BaseTable';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router-dom';

class OverviewTable extends Component {

    viewFormatter = (cell, row) => {
        return <Link to={'/session-results/presentations/details/' + row.id}><button className="btn btn-sm btn-primary"><i className="fa fa-eye"></i> View</button></Link>;
    }

    render() {

        const { data } = this.props;

        return (
            <div>
                <BootstrapTable pagination data={data} keyField='id' options={getOptions()} search>
                    <TableHeaderColumn width="250" headerAlign='center' dataSort caretRender={getSort} dataField='name' dataFormat={getNameFormatter} >Name</TableHeaderColumn>
                    <TableHeaderColumn width="150" headerAlign='center' dataAlign='center' dataSort caretRender={getSort} dataField='numberOfParticipants' dataFormat={getParticipantFormatter} >Participants</TableHeaderColumn>
                    <TableHeaderColumn headerAlign='center' dataSort caretRender={getSort} dataField='startTime' dataFormat={getDateFormatter} >Start time</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataAlign='center' dataField='presentationId' dataFormat={this.viewFormatter} >View</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default OverviewTable;